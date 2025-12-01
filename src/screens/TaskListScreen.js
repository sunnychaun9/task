// C:\Users\ADMIN\Desktop\Shani\TaskManager\TaskManager\src\screens\TaskListScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadTasks} from '../store/slices/taskSlice';
import {logout} from '../store/slices/authSlice';
import TaskItem from '../components/TaskItem';
import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';

export default function TaskListScreen({navigation}) {
  const dispatch = useDispatch();
  const {items, loading, refreshing, error, page, hasMore} = useSelector(
    state => state.tasks,
  );
  
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(loadTasks({page: 1}));
  }, []);

  const handleRefresh = () => {
    dispatch(loadTasks({page: 1, refresh: true}));
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !loading) {
      setLoadingMore(true);
      dispatch(loadTasks({page: page + 1}))
        .finally(() => setLoadingMore(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <Loader style={styles.footerLoader} />;
  };

  if (loading && items.length === 0) {
    return <Loader />;
  }

  if (error && items.length === 0) {
    return (
      <ErrorView
        message={error}
        onRetry={() => dispatch(loadTasks({page: 1}))}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate('TaskDetail', {task: item})}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}>
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerLoader: {
    paddingVertical: 20,
  },
});