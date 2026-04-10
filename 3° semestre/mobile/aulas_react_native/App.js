import { ScrollView } from 'react-native';
import Aula02 from './src/components/Aula02.js';
import Aula01 from './src/components/Aula01.js';

export default function App() {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      
    <Aula01/>
    <Aula02/>

    </ScrollView>
  );
}

