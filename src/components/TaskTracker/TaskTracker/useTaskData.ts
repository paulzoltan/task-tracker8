import axios from 'axios'
import { QueryClient, useMutation, useQuery } from 'react-query'
import { Task } from './TaskTracker'

export const queryClient = new QueryClient()

const host = process.env.REACT_APP_INTERNAL_IP
const port = process.env.REACT_APP_SERVER_PORT
const endpoint =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://csaknem.hu/task-tracker-api/web/`

const invalidateTasks = () => {
  queryClient.invalidateQueries({ queryKey: ['tasks'] })
}
interface useTaskDataProps {
  onEveryFetchFinished: (data: Task[]) => void
}

export const useTaskData = ({ onEveryFetchFinished }: useTaskDataProps) => {
  const {
    isFetching: isQueryFetching,
    isLoading: isQueryLoading,
    error /* , data */,
  } = useQuery({
    queryKey: 'tasks',
    queryFn: () => axios(`${endpoint}tasks`).then((res) => res.data),
    onSuccess: (data) => {
      if (!(isPostLoading || isPutLoading || isDelLoading)) {
        onEveryFetchFinished(data)
      }
    },
  })
  const { isLoading: isPostLoading, mutate: post } = useMutation({
    mutationFn: (task: Task) =>
      axios.post(`${endpoint}tasks`, task).then((res) => res.data),
    onSuccess: invalidateTasks,
  })
  const { isLoading: isPutLoading, mutate: put } = useMutation({
    mutationFn: (task: Task) =>
      axios.put(`${endpoint}tasks/${task.id}`, task).then((res) => res.data),
    onSuccess: invalidateTasks,
  })
  const { isLoading: isDelLoading, mutate: del } = useMutation({
    mutationFn: (id: Task['id']) =>
      axios.delete(`${endpoint}tasks/${id}`).then((res) => res.data),
    onSuccess: invalidateTasks,
  })

  return {
    isQueryFetching,
    isQueryLoading,
    isPostLoading,
    isPutLoading,
    isDelLoading,
    error,
    post,
    put,
    del,
  }
}
