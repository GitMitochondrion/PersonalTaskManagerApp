import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Task } from '../types/Task';

const TaskDetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const { task }: { task: Task } = route.params || {};

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Task details not available.</Text>
            </View>
        );
    }

    const markAsCompleted = () => {
        navigation.navigate('TaskList', { updatedTask: { ...task, status: 'completed' } });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Details</Text>
            <View style={styles.detailItem}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{task.id || 'No ID provided'}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.value}>{task.title || 'No title provided'}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.value}>{task.description || 'No description provided'}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{task.status || 'No status provided'}</Text>
            </View>
            {task.status !== 'completed' && (
                <Button title="Mark as Completed" onPress={markAsCompleted} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    detailItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    value: {
        fontSize: 16,
        marginTop: 5,
        color: '#666',
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
});

export default TaskDetailsScreen;
