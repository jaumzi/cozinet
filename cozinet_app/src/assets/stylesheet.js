import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  imageLogo: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  main_container: {
    paddingLeft: 12,
    paddingRight: 12,
    //marginBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ffcf28'
  },
  buttonLink: {
    marginTop: 5,
    marginRight: 50
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#b32c39',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    height: 1
  },
  validacaoFormMsg: {
    fontSize: 10,
    color: '#d00000',
    flex: 1,
    marginLeft: 35,
    marginRight: 35,
    //backgroundColor:'white',
    //borderRadius:4,
    //borderColor: 'grey',
    //borderWidth: 0.8,
    //borderTopLeftRadius:0,
    //borderTopRightRadius:0,
    //borderTopWidth:0,
    marginTop: -1,
    paddingLeft: 2
  },
  shadow: (elevation = 2) => {
    return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // borderBottomWidth: 0,
    elevation,
  }}
});

export default styles;