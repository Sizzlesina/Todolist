/** @format */

import { Button, Stack, styled, TextField, Typography } from "@mui/material";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface NewTodoProps {
  onAddTodo: (title: string) => void;
}

const ResponsiveTypography = styled(Typography)({
  "@media(max-width: 400px)": {
    padding: 1,
    fontSize: "2rem",
    fontWeight: "bold",
  },
});
const ResponsiveTextField = styled(TextField)({
  "@media (max-width: 400px)": {
    width: "100%",
  },
});

function NewTodo({ onAddTodo }: NewTodoProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const enteredInputText = inputRef.current!.value;

    onAddTodo(enteredInputText);

    inputRef.current!.value = "";
    navigate("/todos");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        margin={5}
        padding={2}
        sx={{
          flexDirection: "column",
          alignItems: "center",
        }}>
        <ResponsiveTypography
          variant='h3'
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          color={"white"}>
          لیست برنامه ریزی
        </ResponsiveTypography>
        <ResponsiveTextField
          inputRef={inputRef}
          variant='filled'
          label='لطفا عنوان برنامه را وارد کنید'
          autoFocus
          sx={{
            backgroundColor: "white",
            width: "30vw",
            borderRadius: ".7rem",
          }}
          size='medium'
          required
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Stack
          margin={2}
          sx={{ display: "flex", justifyContent: "center" }}
          direction={"row"}>
          <Button
            variant='contained'
            size='medium'
            type='submit'
            color='inherit'>
            اضافه کردن
          </Button>
          <Button
            type='button'
            variant='outlined'
            size='small'
            sx={{ bgcolor: "primary.main", color: "white", mr: 1 }}
            onClick={() => navigate("/todos")}>
            مشاهده لیست
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default NewTodo;
