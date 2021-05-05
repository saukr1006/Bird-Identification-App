from django.shortcuts import render

def main(request):
    print(request.data)
    return render(request, 'main.html')