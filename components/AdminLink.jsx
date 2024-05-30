import React, { useContext } from 'react'
import Image from "next/image";
import Link from "next/link";
import { typography } from "@/utils/typography";
import s from '../styles/AdminLink.module.scss'
import { DataContext } from '@/store/GlobalState';
const AdminLink = ({url, content, type, header}) => {
  const { DELETE_IMAGE, EDIT_IMAGE } = typography;
  const {state, dispatch} = useContext(DataContext);
  return (
    <div className="d-flex justify-content-around" style={{ padding: "4%" }}>
      <button className={s.admin_button}>
        <Link href={url}>
          <Image src={EDIT_IMAGE} alt="pencil" width={30} height={30} />
        </Link>
      </button>
      <button
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() =>
          dispatch({
            type: "ADD_MODAL",
            payload: [
              {
                data: [content],
                id: content.id,
                title: header,
                type: type,
              },
            ],
          })
        }
        className={s.admin_button}
        data-testid="admin-delete"
      >
        <Image src={DELETE_IMAGE} alt="delete" width={30} height={30} />
      </button>
    </div>
  );
}

export default AdminLink