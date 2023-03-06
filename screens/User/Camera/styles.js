import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonRecord: {
    alignSelf: 'center',
    marginVertical: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#ff4343',
  },
  buttonStop: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 40,
    width: 40,
    borderRadius: 3,
    backgroundColor: '#ff4343',
  },
  buttonContainer: {
    bottom: 135
  },
  icon:{
    width: 30,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
},
  video: {
    flex: 1,
    alignSelf: "stretch"
  }
});

export default styles;