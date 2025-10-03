import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: 'center',
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      fontSize: 16,
      color: 'red',
    },
    image: {
      width: 180,
      height: 180,
      marginBottom: 20,
    },
    infoTable: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 12,
      paddingVertical: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ddd',
    },
    infoLabel: {
      fontWeight: '600',
      fontSize: 16,
      textTransform: 'capitalize',
    },
    infoValue: {
      fontSize: 16,
      color: '#555',
      textTransform: 'capitalize',
    },
  });