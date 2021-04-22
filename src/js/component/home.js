import React, { useState } from "react";

export function Home() {
	const fetchurl =
		"https://assets.breatheco.de/apis/fake/todos/user/mariahenriqueze";
	const [inputValue, setInputValue] = useState();
	const [itemList, updateItemList] = useState([]);

	const onChangeHandler = e => {
		setInputValue(e.target.value);
	};

	const addTodo = async e => {
		if (e.key == "Enter" && e.target.value !== "") {
			const NuevoTodo = { label: inputValue, done: false };
			// Se hace el put
			await fetch(fetchurl, {
				method: "PUT",
				body: JSON.stringify([...itemList, NuevoTodo]),
				headers: { "Content-Type": "application/json" }
			})
				.then(res => res.json())
				.then(data => console.log([data]));
			// Se hace el get para obtener el todo
			await fetch(fetchurl)
				.then(res => res.json())
				.then(data => {
					updateItemList(data);
					setInputValue("");
				});
		}
	};

	const delTodo = async key => {
		// Como me quedaba un todo, lo fuerzo a que me quede la lista en blanco
		if (itemList.length === 1) {
			updateItemList([]);
		} else {
			const listaNueva = itemList.filter((item, index) => {
				return key !== index ? item : null;
			});
			// Se hace le put
			await fetch(fetchurl, {
				method: "PUT",
				body: JSON.stringify(listaNueva),
				headers: { "Content-Type": "application/json" }
			})
				.then(res => res.json())
				.then(data => console.log([data]));
			// Se hace el get para eliminar un todo
			await fetch(fetchurl)
				.then(res => res.json())
				.then(data => {
					updateItemList(data);
					// e.target.value = " ";
				});
		}
	};

	return (
		<div className="principal">
			<h1>todos</h1>
			<header className="home-header">
				<div className="wrapper">
					<div className="Input-wrapper">
						<input
							value={inputValue}
							onKeyPress={addTodo}
							onChange={onChangeHandler}
							tye="text"
							placeholder="What needs to be done?"
						/>
						<div>
							{itemList.map((todo, key) => {
								return (
									<div className="window" key={key}>
										{todo.label}
										<button onClick={() => delTodo(key)}>
											x
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
