/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';

// AppRegistry.registerComponent(appName, () => App);

registerRootComponent(
    () => {
        return (
            <PaperProvider>
                <App />
            </PaperProvider>
        )
    }
);