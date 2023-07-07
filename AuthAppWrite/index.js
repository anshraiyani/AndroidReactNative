/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Router from './src/routes/Router';
import SignUp from './src/screens/SignUp';

AppRegistry.registerComponent(appName, () => App);
