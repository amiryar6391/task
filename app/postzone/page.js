"use client";

import FromPost from "@/components/fromPost";
import ToPost from "@/components/toPost";
import { fetchPostZone } from "@/redux/slices/from";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ZonePost from "@/components/zone";

export default function PostZone() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostZone());
  }, []);

  const { data } = useSelector((store) => store.fromReducer);
  const { zone } = useSelector((store) => store.statusReducer)

  return (
    <div className=" flex flex-col mt-28 p-5">
        <ZonePost data={data} />
        {
            zone &&
            <>
            <FromPost data={data} />
            <ToPost data={data} />
            </>
        }
    </div>
  );
}







