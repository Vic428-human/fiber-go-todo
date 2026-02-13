
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const TodoForm = () => {
    const [newTodo, setNewTodo] = useState("");
    const queryClient = useQueryClient();

    const { mutate: createTodo, isPending: isCreating } = useMutation({
        mutationKey: ["createTodo"],
        mutationFn: async (todoBody: string) => {  // 只接收字串
            const res = await fetch('http://localhost:5000/api' + `/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ body: todoBody }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }
            return data;
        },
        onSuccess: () => {
            setNewTodo("");  // 清空狀態移到這裡
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTodo(newTodo);  // 只傳資料
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新增 Todo"
                disabled={isCreating}
            />
            <button type="submit" disabled={isCreating}>
                {isCreating ? "新增中..." : "新增"}
            </button>
        </form>
    );
};
export default TodoForm;  // 這行絕對不能少！
