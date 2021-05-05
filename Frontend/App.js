import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import Info from './screens/Info';

const navigator = createStackNavigator({
  Login: Login,
  Signup: Signup,
  Profile: Profile,
  Info:Info
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    title: 'Pakshi Pehchano'
  }
});

export default createAppContainer(navigator);