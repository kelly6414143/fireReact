import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";

export default function UserDetail({ history: { replace, push }, history }) {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let queryRow = useQuery().get("row");
    let queryTable = useQuery().get("page");

    useEffect(() => {
        React.$commonTool.devConsole("detail", history, queryRow, queryTable)
    }, [])
    // React.$commonTool.devConsole("query", query.get("row"))


    return (
        <>
            <div>
                會員詳情
            </div>
            <span
                className="bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
                onClick={() => { push(queryRow? `/users/rowDisplay?row=${queryRow}` : `/users/tableDisplay?page=${queryTable}`)}}
            >返回</span>
        </>
    );
}

