import axios from "axios";
import { useEffect, useState } from "react";
import RecipesLoading from "./components/RecipesLoading";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
}

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/recipes");

        // delay response
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <main>
      <nav>
        <h1>Recipes</h1>
      </nav>
      {isLoading ? (
        <RecipesLoading />
      ) : (
        <section className="grid grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="flex flex-col justify-between">
              <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage
                    src={`src/assets/images/${recipe.image}`}
                    alt="recipe image"
                    className="object-cover"
                  />
                  <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>{recipe.time} mins to cook.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recipe.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>View Recipe</Button>
                {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
              </CardFooter>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
};

export default App;
