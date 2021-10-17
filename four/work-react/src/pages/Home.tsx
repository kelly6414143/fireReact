import { ReactNode } from "react";

interface IProps {
    history: { [index: string]: any };
    routes: { [index: string]: any };
    children: ReactNode;
    setUserInfo?: ({ }) => void;
    userInfo?: { [index: string]: any };
  }

export default function Home(props:IProps) {

    return (
        <div>
            首頁
        </div>
    );
}

