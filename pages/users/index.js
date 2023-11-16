import Head from "next/head";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import Image from "next/image";
import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth, modal } = state;

  if (!auth.user) return null;
  return (
    <div className="table-responsive">
      <Head>
        <title>Зарегестрированные пользователи</title>
      </Head>

      <table className="table w-100">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} style={{ cursor: "pointer" }}>
              <th>{index + 1}</th>
              <th>{user.id}</th>
              <th>
                <Image
                  src={user.avatar.url}
                  alt={user.avatar.url}
                  style={{
                    overflow: "hidden",
                    objectFit: "cover",
                  }}
                  width={30}
                  height={30}
                />
              </th>
              <th>{user.name}</th>
              <th>{user.email}</th>
              <th>
                {user.role === "admin" ? (
                  user.root ? (
                    <i>
                      <FaCheck className="text-success" />
                      Root
                    </i>
                  ) : (
                    <i>
                      <FaCheck className="text-success" />
                    </i>
                  )
                ) : (
                  <i>
                    <FaTimes className="text-danger" />
                  </i>
                )}
              </th>
              <th>
                <Link
                  href={
                    auth.user.root && auth.user.email !== user.email
                      ? `/edit_user/${user.id}`
                      : "#!"
                  }
                >
                  <i>
                    <FaEdit className="text-info mr-2" title="Edit" />
                  </i>
                </Link>
                <i> </i>
                {auth.user.root && auth.user.email !== user.email ? (
                  <i>
                    <FaTrashAlt
                      className="text-danger ml-2"
                      title="Remove"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>
                        dispatch({
                          type: "ADD_MODAL",
                          payload: [
                            {
                              data: users,
                              id: user.id,
                              title: user.name,
                              type: "ADD_USER",
                            },
                          ],
                        })
                      }
                    />
                  </i>
                ) : (
                  <i>
                    <AiOutlineDelete
                      className="text-danger ml-2"
                      title="Remove"
                    />
                  </i>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
