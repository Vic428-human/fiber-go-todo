/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../App";

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");

	const queryClient = useQueryClient();

	const { mutate: createTodo, isPending: isCreating } = useMutation({
		mutationKey: ["createTodo"],
		mutationFn: async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				const res = await fetch(BASE_URL + `/todos`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ body: newTodo }),
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				setNewTodo("");
				return data;
			} catch (error: any) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error: any) => {
			alert(error.message);
		},
	});

	return (
		<form onSubmit={createTodo}>
			<div>
				<Input
					type='text'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<button
					type='submit'
				>
					創建
				</button>
			</div>
		</form>
	);
};
export default TodoForm;