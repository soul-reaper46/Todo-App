/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Todo from './components/screens/mainscreen.js';
//import Todos from './components/screens/Todo.js';

AppRegistry.registerComponent(appName, () => Todo);
