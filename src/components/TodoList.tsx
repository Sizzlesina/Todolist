/** @format */

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TodoListProps {
  items: {
    id: string;
    title: string;
    date: string;
  }[];
  onDeleteTodo: (id: string) => void;
}
const ResponsiveBox = styled(Box)({
  height: "100vh",
  width: "100%",
  padding: "1px",
  "@media (max-width: 400px)": {
    height: "auto",
    overflow: "scroll",
    paddingRight: 0, // Remove padding on the right for smaller screens
  },
});

const ResponsiveTableCell = styled(TableCell)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "@media (max-width: 400px)": {
    width: "50px", // Adjust width for smaller screens
    fontSize: "1rem", // Adjust font size for smaller screens
  },
});

function TodoList({ items, onDeleteTodo }: TodoListProps) {
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedStatuses = JSON.parse(
      window.localStorage.getItem("statuses") || "{}"
    );
    if (storedStatuses) {
      setStatuses(storedStatuses);
    }
  }, []);

  const handleRadioChange = (
    event: ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const value = event.target.value;
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [todoId]: value,
    }));
    window.localStorage.setItem(
      "statuses",
      JSON.stringify({ ...statuses, [todoId]: value })
    );
  };

  return (
    <ResponsiveBox>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <ResponsiveTableCell>
                <Typography variant='h5' fontWeight='bold' color={"whitesmoke"}>
                  عنوان
                </Typography>
              </ResponsiveTableCell>
              <ResponsiveTableCell>
                <Typography variant='h5' fontWeight='bold' color={"whitesmoke"}>
                  تاریخ شروع
                </Typography>
              </ResponsiveTableCell>
              <ResponsiveTableCell>
                <Typography variant='h5' fontWeight='bold' color={"whitesmoke"}>
                  وضعیت
                </Typography>
              </ResponsiveTableCell>
              <ResponsiveTableCell>
                <Typography
                  variant='h6'
                  fontWeight={"bold"}
                  color={"whitesmoke"}>
                  آیا تمایل به حذف دارید؟
                </Typography>
              </ResponsiveTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((todo) => (
              <TableRow key={todo.id}>
                <ResponsiveTableCell
                  sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  {todo.title}
                </ResponsiveTableCell>
                <ResponsiveTableCell>{todo.date}</ResponsiveTableCell>
                <ResponsiveTableCell>
                  <FormControl>
                    <RadioGroup
                      row
                      name='status'
                      aria-labelledby='status'
                      value={statuses[todo.id] ?? ""}
                      onChange={(e) => handleRadioChange(e, todo.id)}>
                      <FormControlLabel
                        value='Done'
                        control={<Radio size='medium' color='success' />}
                        label='انجام شد'
                      />
                      <FormControlLabel
                        value='Failed'
                        control={<Radio size='medium' color='error' />}
                        label='انجام نشد'
                      />
                    </RadioGroup>
                  </FormControl>
                </ResponsiveTableCell>
                <ResponsiveTableCell>
                  <Button
                    onClick={() => onDeleteTodo(todo.id)}
                    variant='contained'
                    size='medium'
                    sx={{
                      ml: "2rem",
                      bgcolor: "error.main",
                      color: "white",
                    }}>
                    حذف
                  </Button>
                </ResponsiveTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant='outlined'
        sx={{
          bgcolor: "info.main",
          color: "white",
          mt: 2,
          mr: 2,
        }}
        onClick={() => navigate("/")}>
        بازگشت
      </Button>
    </ResponsiveBox>
  );
}

export default TodoList;
