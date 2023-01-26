<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Speler;

class spelerController extends Controller
{
    function allSpelers(){
        return Speler::all();
    }

    function totalGoals(){
        return Speler::pluck('goals')->sum();
    }
    
    function totalAssists(){
        return Speler::pluck('assists')->sum();
    }
    
    function totalKaarten(){
        return Speler::pluck('rode kaarten')->sum();
    }

    function getSpeler($id){
        return Speler::all()->find($id)->naam;
        //$url = Laptop::all()->find($id)->foto;
        //return "<img src='{$url}' />";
    }

    function minMaxAssists($min, $max){
        if ($min <= $max)
            return Speler::all()
            ->where("assists", ">=", $min)
            ->where("assists", "<=", $max);
        else{
            return Speler::where("assists", ">=", $min)->get();
        }
    }

    function minMaxKaarten($min, $max){
        if ($min <= $max)
            return Speler::all()
            ->where("rode kaarten", ">=", $min)
            ->where("rode kaarten", "<=", $max);
        else{
            return Speler::where("rode kaarten", ">=", $min)->get();
        }
    }
    function minMaxGoals($min, $max){
        if ($min <= $max)
            return Speler::all()
            ->where("goals", ">=", $min)
            ->where("goals", "<=", $max);
        else{
            return Speler::where("goals", ">=", $min)->get();
        }
    }
}