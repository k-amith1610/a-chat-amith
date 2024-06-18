import Search from "./Search"
import Users from "./Users"
import Logout from "./Logout";

const Left = () => {

  return (
    <div className="w-full bg-black text-gray-300">
      <Search />
      <div className="flex-1 overflow-y-auto py-4" style={{ minHeight: "calc(83vh - 10vh)" }}>
        <Users />
      </div>
      <Logout />
    </div>
  )
}

export default Left
