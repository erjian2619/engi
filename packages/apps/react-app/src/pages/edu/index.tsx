import React, { ReactEventHandler, useEffect, useState } from "react";

/*  */
// import { ValidCore } from "@zs/valid-core";

type Props = {};

// const core = new ValidCore();
export default function Edu({}: Props) {
  const [logList, setLogList] = useState<Array<string>>();
  console.log('edu load');
  

  // const showLog = (newLogList: Array<string>) => {
  //   setLogList((_) => newLogList);
  // };

  // useEffect(() => {
  //   core.addPlugin("stepInfo", (ctx) => {
  //     ctx.login.push("手机号确认");
  //     showLog([...ctx.login]);
  //     return ctx;
  //   });
  //   core.addPlugin("stepInfo", (ctx) => {
  //     ctx.login.push("邮箱确人");
  //     showLog([...ctx.login]);
  //     return ctx;
  //   });

  //   core.usePlugin("stepPost", "postUrlPlugin", "http://post/url");
  //   core.addPlugin("stepPost", (ctx) => {
  //     showLog([...ctx.login]);
  //     return ctx;
  //   });
  // }, []);

  // const handleClick: ReactEventHandler<HTMLButtonElement> = (e) => {
  //   console.log(core);
    
  //   core.run();
  // };

  return (
    <div>
      <button className=" p-3 bg-blue-500">
        提交
      </button>
      <div className=" flex flex-col">{logList?.map((item) => item)}</div>
    </div>
  );
}
