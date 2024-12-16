import {createContext, PropsWithChildren, useState} from "react";
import {Button, Flex} from "antd";
import Title from "antd/es/typography/Title";

interface IProductFilterContext {
    onlyFavorites: boolean;

    // Блин, вот думаю, что все же нужно было сделать тип для status :)
    completed: "all" | "completed" | "not_completed";
}

export const ProductFilterContext = createContext<IProductFilterContext>({} as IProductFilterContext);

export const ProductFilterProvider = ({children}: PropsWithChildren) => {
    const [completed, setCompleted] = useState<"all" | "completed" | "not_completed">("all");
    const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);


    return <ProductFilterContext.Provider value={{
        completed,
        onlyFavorites
    }}>
        <div style={{margin: "1rem 0"}}>
            <Title type="secondary" level={5}>Favorite</Title>
            <Button
                type={onlyFavorites ? "primary" : "default"}
                onClick={() => setOnlyFavorites(!onlyFavorites)}
            >Favorites</Button>
        </div>

        <Title type="secondary" level={5} color="#455455">Completed</Title>
        <Flex gap={8}>
            <Button type={completed === "all" ? "primary" : "default"}
                    onClick={() => setCompleted("all")}>All</Button>
            <Button type={completed === "completed" ? "primary" : "default"}
                    onClick={() => setCompleted("completed")}>Completed</Button>
            <Button type={completed === "not_completed" ? "primary" : "default"}
                    onClick={() => setCompleted("not_completed")}>Not completed</Button>
        </Flex>
        {children}
    </ProductFilterContext.Provider>;
}