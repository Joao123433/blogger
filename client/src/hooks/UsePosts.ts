import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export function UsePosts() {
	const context = useContext(PostContext);

	return context;
}