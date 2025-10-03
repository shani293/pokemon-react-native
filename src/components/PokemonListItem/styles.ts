import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#eee',
    },
    imageContainer: {
      width: 50,
      height: 50,
      marginRight: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 45,
      height: 45,
    },
    placeholder: {
      width: 45,
      height: 45,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: '500',
      textTransform: 'capitalize',
    },
  });