import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";
import { checkApiKey, checkId } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const [apiKey, setApiKey] = useState("");
  const [valid, setValid] = useState(true);
  const [failed, setFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("api-key");
    if (key) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setValid(checkId(apiKey));
  }, [apiKey]);

  const login = async () => {
    const code = (await checkApiKey(apiKey)) as { status?: number };
    if (code.status === 401) setFailed(true);
    else {
      localStorage.setItem("api-key", apiKey);
      navigate(`/`);
    }
  };

  return (
    <div className="flex items-center flex-col p-[20px] min-h-screen">
      <Logo />
      <Input value={apiKey} setValue={setApiKey} valid={valid} />
      <Button disabled={!valid} text="Log In" onClick={login} />
    </div>
  );
}
