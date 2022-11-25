import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {
 
  recipes : Recipe[];
  subscription : Subscription;

  constructor(private recipeService : RecipeService , 
              private route : ActivatedRoute , 
              private router : Router) { }

  ngOnInit(){
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
      (recipes : Recipe[]) => {
      this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }

  onEdit(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
