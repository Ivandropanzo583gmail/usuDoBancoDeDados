"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
};

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Definir o tipo do estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users"); // Garantir o tipo correto da resposta
        setUsers(response.data);
      } catch (err) {
        console.error(err); // Log do erro no console para depuração
        setError("Erro ao buscar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-purple-500 mb-6">Lista de Usuários</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-gray-800 text-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-400">{user.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
