import { useQueryClient } from "@tanstack/react-query"
import { getInventoryQueryKey, useCreateUser, useGetInventory, useGetOrderById } from "./api-kubb"
import { mockUser } from "./utils/mock-user"


function ExampleKubb() {
  const queryClient = useQueryClient()
  const { data: dataGetAll, isFetching: loadingGetAll } = useGetInventory()
  const { data: dataGetById, isFetching: loadingGetById } = useGetOrderById(2)
  const { mutate, data, isPending } = useCreateUser()


  const handleCreateUser = () => {
    mutate({ data: mockUser })
  }

  const handleCreateUserAndInvalidate = () => {
    mutate(
      { data: mockUser },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: getInventoryQueryKey() })
        }
      }
    )
  }

  return (
    <div style={{ width: '100vw' }}>
      <h1>Example Kubb</h1>
      <hr />

      {/* Get all */}
      <h2>Get All</h2>
      {loadingGetAll ? <p>Loading...</p> : JSON.stringify(dataGetAll)}

      {/* Get by id */}
      <h2>Get By Id</h2>
      {loadingGetById ? <p>Loading...</p> : JSON.stringify(dataGetById)}

      {/* Create */}
      <h2>Create</h2>
      <button disabled={isPending} onClick={() => handleCreateUser()} style={{ marginRight: 20 }}>Create User</button>
      <button disabled={isPending} onClick={() => handleCreateUserAndInvalidate()}>Create User and Invalidate</button>
      <p>{isPending ? 'Creating...' : JSON.stringify(data)}</p>


    </div>
  )
}

export default ExampleKubb
