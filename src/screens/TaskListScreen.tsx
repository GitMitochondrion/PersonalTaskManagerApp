import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/Task';

const TaskListScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        console.log('TaskListScreen rendering...');
        console.log('Setting mock tasks...');
        setTasks([
            { id: '1', title: 'Task 1', description: 'Description 1', status: 'pending' },
            { id: '2', title: 'Task 2', description: 'Description 2', status: 'completed' },
            { id: '3', title: 'Task 3', description: 'Description 3', status: 'pending' },
        ]);
    }, []);

    useEffect(() => {
        if (route.params?.updatedTask) {
            const updatedTask = route.params.updatedTask;
            setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        }
    }, [route.params?.updatedTask]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: (tasks.length + 1).toString(), title: newTask, description: 'New task description', status: 'pending' }]);
            setNewTask('');
        }
    };

    const editTask = (task: Task) => {
        setEditingTask(task);
        setNewTask(task.title);
    };

    const updateTask = () => {
        if (editingTask && newTask.trim()) {
            setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, title: newTask } : task));
            setEditingTask(null);
            setNewTask('');
        }
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task List</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <TouchableOpacity onPress={() => navigation.navigate('TaskDetails', { task: item })}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text style={styles.taskDescription}>{item.description}</Text>
                        </TouchableOpacity>
                        <View style={styles.taskActions}>
                            <Button title="Edit" onPress={() => editTask(item)} />
                            <Button title="Delete" onPress={() => deleteTask(item.id)} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No tasks available</Text>}
            />
            <TextInput
                placeholder="New Task"
                value={newTask}
                onChangeText={setNewTask}
                style={styles.input}
            />
            <Button title={editingTask ? "Update Task" : "Add Task"} onPress={editingTask ? updateTask : addTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    taskItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskTitle: { fontSize: 18, fontWeight: '500', color: '#333' },
    taskDescription: { fontSize: 14, color: '#666' },
    taskActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});

export default TaskListScreen;
