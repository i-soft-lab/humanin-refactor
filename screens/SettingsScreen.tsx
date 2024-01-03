import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

const SettingsScreen : React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Text>SettingsScreen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#101945',
      display: 'flex',
      rowGap: 16,
    },
    avatarContainer: {
      flex: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    listContainer: {
      flex: 3,
      display: 'flex',
    },
  });

export default SettingsScreen;