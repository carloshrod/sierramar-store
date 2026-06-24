import { Clock, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/lib/types/post";

export function RecipeDetails({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mt-8 rounded-3xl bg-secondary/30 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="gap-1.5">
          <Clock className="size-3.5" />
          {recipe.prepTime} min
        </Badge>
        <Badge variant="secondary" className="gap-1.5">
          <Gauge className="size-3.5" />
          {recipe.difficulty}
        </Badge>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h3 className="font-serif text-lg tracking-tight">Ingredientes</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-foreground">·</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg tracking-tight">Pasos</h3>
          <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="font-serif text-foreground">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
