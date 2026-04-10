// Aqui é onde importaremos todas as bibliotecas e componentes que utilizaremos
import { StatusBar } from 'expo-status-bar';
// todo componente viasual utilizado em react native precisa ser importado
import { StyleSheet, Text, View } from 'react-native';

export default function Aula01() {
  return (
    // o componente view, corresponde ao div, main, section, header do html
    <View style={estilos.container}>
      {/* o componente text corresponde ao p, h1, h2, h3, span do html */}
      <Text style={estilos.titulo}>Hello world!</Text>
      <Text style={{fontWeight: 'bold'}}>Olá esse é meu primeiro app!</Text>
      {/* Defino e estilizo a barra de status do dispositivo */}
      <StatusBar style="auto" />
      {/* aqui vou colocar o exercicio */}

    <View style={{width: "100%"}}>
      <Text style={{textAlign: 'left', color: 'blue'}}>azul</Text>
      <Text style={{fontWeight: 'bold', textAlign: 'right'}}>negrito</Text>
      <Text style={{textAlign: 'center', color: 'red'}}>vermelho</Text>
      
    </View>
    
    

    </View>
  );
}
// para estilizarmos em react native, importamos o stylesheet
// e fazemos um objeto estilização igual react
const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
  }
});