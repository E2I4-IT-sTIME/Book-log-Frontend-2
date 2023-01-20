import BasicInfoInput from "./BasicInfoInput";
import AddInfoInput from "./AddInfoInput";
import { useState, useEffect } from "react";

interface Info {
  birthday: string;
  email: string;
  image: File;
  job: string;
  password: string;
  username: string;
}

enum Stage {
  BasicInfo,
  AddInfo,
  Complete,
}

export default function Layout() {
  const [info, setInfo] = useState<Info>();
  const [stage, setStage] = useState<Stage>(Stage.BasicInfo);

  return <div></div>;
}
