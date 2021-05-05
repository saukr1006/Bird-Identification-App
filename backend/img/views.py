from django.shortcuts import render
from .serializers import PostSerializer
from .models import Post
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import base64
from tensorflow import keras
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
import json

# Create your views here.


def prepare(location):
    with open('info.json', encoding='utf-8') as fl:
        data_dict = json.load(fl)
    print(data_dict)
    model = keras.models.load_model('./model.h5')
    with open('data.json', 'r') as fp:
        dic = json.load(fp)
    icd = {k: v for v, k in dic.items()}
    img = load_img(location, target_size=(224, 224, 3))
    img = img_to_array(img)
    img = img/255
    img = np.expand_dims(img, [0])
    answer = model.predict_classes(img)
    probability = round(np.max(model.predict_proba(img)*100), 2)
    # print ('Bird Is',icd[answer[0]], 'With probability',probability)
    #print (answer)
    print(probability, '% chances are there that the Bird Is',
          icd[answer[0]])

    return {'probability': probability, 'bird_name': icd[answer[0]], 'bird_details': data_dict[icd[answer[0]]]}


class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            string = posts_serializer.data['content']
            imgData = base64.b64decode(string)
            filename = "hutiya.jpg"
            with open(filename, 'wb') as fl:
                fl.write(imgData)
            som = prepare("hutiya.jpg")
            #return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
            return Response(som, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
