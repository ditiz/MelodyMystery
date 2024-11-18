import type { ReactNode } from "react";

const ListItem = ({ children }: { children: ReactNode }) => {
	return (
		<li
			className="
				flex items-center justify-between px-4 py-2 gap-2
				relative transition-all rounded 
				outline outline-offset-2 outline-gray-800 hover:outline-gray-600 
			"
		>
			{children}
		</li>
	);
};

export default ListItem;
