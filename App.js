import React from 'react'
import { View  ,Text} from 'react-native'
import Navigation from './config/navigation';

function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Navigation/>
    </View>
  );
}

export default App
