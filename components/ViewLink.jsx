import React from 'react'
import Link from "next/link";
import { typography } from '@/utils/typography';
const ViewLink = ({url}) => {
     const { LINK_MOREINFO_COLOR } = typography;
  return (
      <>
        <Link
          href={url}
          className="btn btn-info flex-fill"
          style={{
            marginRight: "5px",
            flex: 1,
            color: "white",
            backgroundColor: LINK_MOREINFO_COLOR,
            maxHeight: '37.8px'
          }}
        >
          Узнать больше
        </Link>
      </>
  )
}

export default ViewLink