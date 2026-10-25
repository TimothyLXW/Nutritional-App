import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Leaf,
  Home,
  BookOpen,
  ChartNoAxesCombined,
  User,
  Plus,
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Search,
  ScanBarcode,
  Camera,
  Sparkles,
  X,
  Check,
  Heart,
  Clock,
  Flame,
  Settings,
  Download,
  SlidersHorizontal,
  Trash2,
  Copy,
  Utensils,
  Image,
  CheckCheck,
} from "lucide-react";
import "./style.css";
import { screenSVG } from "./export";
const baseFoods = [
  {
    id: 1,
    name: "Avocado toast & eggs",
    portion: "2 slices · 1 plate",
    kcal: 420,
    p: 24,
    c: 38,
    f: 19,
    meal: "Breakfast",
    art: "🥑",
  },
  {
    id: 2,
    name: "Salmon nourish bowl",
    portion: "1 bowl · 380 g",
    kcal: 680,
    p: 42,
    c: 76,
    f: 23,
    meal: "Lunch",
    art: "🥗",
  },
  {
    id: 3,
    name: "Greek yogurt & granola",
    portion: "1 bowl · 220 g",
    kcal: 350,
    p: 24,
    c: 40,
    f: 10,
    meal: "Snacks",
    art: "🫐",
  },
  {
    id: 4,
    name: "Banana & peanut butter",
    portion: "1 serving",
    kcal: 300,
    p: 10,
    c: 66,
    f: 0,
    meal: "Snacks",
    art: "🍌",
  },
];
const recipes = [
  {
    id: 10,
    name: "The everyday chicken bowl",
    kcal: 610,
    p: 52,
    c: 60,
    f: 17,
    art: "🥙",
    time: 25,
    tags: "High protein",
    ingredients: [
      "150 g grilled chicken",
      "150 g cooked brown rice",
      "100 g seasonal vegetables",
      "1 tbsp lemon dressing",
    ],
  },
  {
    id: 11,
    name: "Green goddess pasta",
    kcal: 540,
    p: 28,
    c: 70,
    f: 16,
    art: "🥦",
    time: 20,
    tags: "Vegetarian",
    ingredients: [
      "80 g wholegrain pasta",
      "100 g broccoli",
      "½ avocado",
      "Fresh basil and lemon",
    ],
  },
  {
    id: 12,
    name: "Sunshine breakfast bowl",
    kcal: 390,
    p: 22,
    c: 48,
    f: 12,
    art: "🍓",
    time: 10,
    tags: "Vegetarian",
    ingredients: [
      "150 g Greek yogurt",
      "40 g oats",
      "100 g mixed berries",
      "1 tsp honey",
    ],
  },
];
const screens = [
  "Home",
  "Diary",
  "Insights",
  "Profile",
  "Welcome",
  "Onboarding",
  "Log food",
  "Barcode",
  "AI scan",
  "Suggestions",
  "Recipes",
  "Recipe detail",
  "Create recipe",
  "Premium",
  "Targets",
  "Settings",
  "Account",
];
const stored = (() => {
  try {
    return JSON.parse(localStorage.getItem("nutrigoal-demo") || "{}");
  } catch {
    return {};
  }
})();
function App() {
  const [screen, setScreen] = useState("Home"),
    [history, setHistory] = useState([]),
    [foods, setFoods] = useState(stored.foods || baseFoods),
    [premium, setPremium] = useState(stored.premium ?? true),
    [sheet, setSheet] = useState(false),
    [toast, setToast] = useState(""),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState(recipes[0]),
    [saved, setSaved] = useState(stored.saved || []),
    [meal, setMeal] = useState("Dinner"),
    [quantity, setQuantity] = useState(1),
    [step, setStep] = useState(0),
    [goal, setGoal] = useState(stored.goal || "Muscle gain"),
    [name, setName] = useState(stored.name || "Alex"),
    [period, setPeriod] = useState("Week"),
    [day, setDay] = useState(0),
    [scan, setScan] = useState(false),
    [ingredients, setIngredients] = useState([
      "Steamed chicken",
      "White rice",
      "Cucumber",
      "Chicken rice sauce",
    ]),
    [annual, setAnnual] = useState(true),
    [filter, setFilter] = useState("All"),
    [rotation, setRotation] = useState(false),
    [recipeName, setRecipeName] = useState(""),
    [custom, setCustom] = useState(stored.custom || []),
    [ingredient, setIngredient] = useState(""),
    [servings, setServings] = useState(2),
    [diet, setDiet] = useState(stored.diet || "No preference"),
    [allergies, setAllergies] = useState(stored.allergies || "None"),
    [target, setTarget] = useState(stored.target || 2400),
    [nutrientTargets, setNutrientTargets] = useState(
      stored.nutrientTargets || {
        protein: 150,
        carbs: 285,
        fat: 70,
        fibre: 30,
      },
    ),
    [authMode, setAuthMode] = useState("Sign up"),
    [authEmail, setAuthEmail] = useState(""),
    [authPassword, setAuthPassword] = useState(""),
    [deleteConfirm, setDeleteConfirm] = useState(false),
    [notifications, setNotifications] = useState(true),
    [chartDay, setChartDay] = useState(5);
  useEffect(() => {
    localStorage.setItem(
      "nutrigoal-demo",
      JSON.stringify({
        foods,
        name,
        goal,
        premium,
        saved,
        custom,
        target,
        diet,
        allergies,
        nutrientTargets,
      }),
    );
  }, [
    foods,
    name,
    goal,
    premium,
    saved,
    custom,
    target,
    diet,
    allergies,
    nutrientTargets,
  ]);
  const [editing, setEditing] = useState(null);
  const go = (s) => {
    if (s === "Create recipe") {
      setIngredients([]);
      setRecipeName("");
    }
    setHistory((h) => [...h, screen]);
    setScreen(s);
    setSheet(false);
    setQuery("");
    setQuantity(1);
    setScan(false);
    window.scrollTo(0, 0);
  };
  const back = () => {
    setScreen(history.at(-1) || "Home");
    setHistory((h) => h.slice(0, -1));
    setScan(false);
  };
  const notify = (t) => {
    setToast(t);
    setTimeout(() => setToast(""), 3200);
  };
  const totals = (day === 0 ? foods : []).reduce(
    (a, f) => ({
      kcal: a.kcal + f.kcal,
      p: a.p + f.p,
      c: a.c + f.c,
      f: a.f + f.f,
    }),
    { kcal: 0, p: 0, c: 0, f: 0 },
  );
  function add(f, q = quantity) {
    setFoods((fs) => [
      ...fs,
      {
        ...f,
        id: Date.now(),
        name: f.name,
        kcal: Math.round(f.kcal * q),
        p: Math.round(f.p * q),
        c: Math.round(f.c * q),
        f: Math.round(f.f * q),
        meal,
        portion: `${q} serving${q === 1 ? "" : "s"}`,
      },
    ]);
    setDay(0);
    go("Diary");
    notify("Meal added. Your daily progress is updated.");
  }
  const protect = (s) => (premium ? go(s) : go("Premium"));
  const Button = ({ children, onClick, secondary = false, ...props }) => (
    <button
      className={secondary ? "button secondary" : "button"}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
  const Heading = ({ eyebrow, title, sub }) => (
    <div className="page-heading">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </div>
  );
  const Macro = ({ label, value, max, color }) => (
    <div className="macro">
      <div>
        <span>{label}</span>
        <b>
          {Math.round(value)}
          <small> / {max} g</small>
        </b>
      </div>
      <div className="track">
        <i
          style={{
            width: Math.min(100, (value / max) * 100) + "%",
            background: color,
          }}
        />
      </div>
    </div>
  );
  const FoodArt = ({ food, big = false }) => (
    <div className={"food-art " + (big ? "big " : "") + "art-" + (food.id % 3)}>
      <span>{food.art || "🥣"}</span>
      <i />
      <i />
    </div>
  );
  const FoodRow = ({ food, editable = false }) => (
    <div className="food-row">
      <FoodArt food={food} />
      <div className="food-info">
        <b>{food.name}</b>
        <small>
          {food.portion || "1 serving"} · P {food.p} / C {food.c} / F {food.f}
        </small>
      </div>
      <div className="food-end">
        <b>{food.kcal}</b>
        <small>kcal</small>
        {editable && (
          <button
            aria-label={"Delete " + food.name}
            onClick={() => {
              setFoods((fs) => fs.filter((f) => f.id !== food.id));
              notify("Food removed");
            }}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
  const RecipeCard = ({ r }) => (
    <article className="recipe-card">
      <button
        className="recipe-image"
        onClick={() => {
          setSelected(r);
          go("Recipe detail");
        }}
      >
        <FoodArt food={r} big />
      </button>
      <button
        className={"save " + (saved.includes(r.id) ? "active" : "")}
        aria-label="Save recipe"
        onClick={() =>
          setSaved((s) =>
            s.includes(r.id) ? s.filter((id) => id !== r.id) : [...s, r.id],
          )
        }
      >
        <Heart
          size={18}
          fill={saved.includes(r.id) ? "currentColor" : "none"}
        />
      </button>
      <div className="recipe-body">
        <span className="tag">{r.tags}</span>
        <h3>{r.name}</h3>
        <p>
          <Flame size={13} /> {r.kcal} kcal <span>·</span>
          <Clock size={13} /> {r.time} min
        </p>
        <button
          className="text-button"
          onClick={() => {
            setSelected(r);
            go("Recipe detail");
          }}
        >
          View recipe <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
  function exportSVG() {
    download(
      new Blob([screenSVG(document.querySelector(".phone"))], {
        type: "image/svg+xml",
      }),
      `NutriGoal-${screen.replaceAll(" ", "-")}.svg`,
    );
    notify("SVG exported. Drag it into Figma.");
  }
  function download(blob, filename) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const mealFields = (
    <div className="fields two">
      <label>
        Meal
        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
          {["Breakfast", "Lunch", "Dinner", "Snacks"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Servings
        <input
          type="number"
          min="0.25"
          step="0.25"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(0.25, Number(e.target.value)))}
        />
      </label>
    </div>
  );
  let content;
  if (screen === "Home")
    content = (
      <>
        <div className="greeting">
          <div>
            <p>A LITTLE BETTER, EVERY DAY</p>
            <h1>
              Good afternoon, {name} <span>☀</span>
            </h1>
            <small>Sunday, 25 October · Demo day</small>
          </div>
          <button className="avatar" onClick={() => go("Profile")}>
            {name.slice(0, 1)}
          </button>
        </div>
        <div className="goal-row">
          <span className="goal-pill">
            <Leaf size={13} />
            {goal}
          </span>
          <span className="subtle">Your daily overview</span>
        </div>
        <section className="nutrition-card">
          <div className="section-title">
            <h2>Today’s nutrition</h2>
            <span className="tag white">On your way</span>
          </div>
          <div className="energy">
            <div
              className="ring"
              style={{
                background: `conic-gradient(#e4ba79 ${Math.min(100, (totals.kcal / target) * 100)}%,#47745e 0)`,
              }}
            >
              <div>
                <Flame size={20} />
                <strong>{totals.kcal.toLocaleString()}</strong>
                <span>of {target.toLocaleString()} kcal</span>
              </div>
            </div>
            <div className="remaining">
              <span>Room to nourish</span>
              <strong>{Math.max(0, target - totals.kcal)}</strong>
              <span>kcal remaining</span>
              <small>One good choice at a time.</small>
            </div>
          </div>
          <div className="macros">
            <Macro
              label="Protein"
              value={totals.p}
              max={nutrientTargets.protein}
              color="#edc48d"
            />
            <Macro
              label="Carbs"
              value={totals.c}
              max={nutrientTargets.carbs}
              color="#b8cfa4"
            />
            <Macro
              label="Fat"
              value={totals.f}
              max={nutrientTargets.fat}
              color="#c9b8dc"
            />
          </div>
        </section>
        <div className="quick-actions">
          <Button onClick={() => go("Log food")}>
            <Plus size={18} /> Log a meal
          </Button>
          <Button secondary onClick={() => setSheet(true)}>
            <ScanBarcode size={18} /> Quick scan
          </Button>
        </div>
        <section className="insight-card">
          <div className="spark-icon">
            <Sparkles size={21} />
          </div>
          <div>
            <div className="eyebrow">A LITTLE GUIDANCE {premium && "✦"}</div>
            <h3>
              {Math.max(0, nutrientTargets.protein - totals.p)} g of protein to
              go
            </h3>
            <p>
              A nourishing dinner can help you finish your day feeling good.
            </p>
            <button
              className="text-button"
              onClick={() => protect("Suggestions")}
            >
              Find your next meal <ArrowUpRight size={15} />
            </button>
          </div>
        </section>
        <div className="section-title">
          <h2>On the menu today</h2>
          <button className="text-button" onClick={() => go("Diary")}>
            View diary <ChevronRight size={14} />
          </button>
        </div>
        <div className="card">
          {foods.slice(0, 2).map((f) => (
            <FoodRow key={f.id} food={f} />
          ))}
        </div>
        <div className="section-title">
          <h2>A fresh bit of inspiration</h2>
          <button className="text-button" onClick={() => go("Recipes")}>
            Explore <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="recipe-grid">
          {recipes.slice(0, 2).map((r) => (
            <RecipeCard key={r.id} r={r} />
          ))}
        </div>
      </>
    );
  else if (screen === "Diary")
    content = (
      <>
        <Heading
          eyebrow="MAKE EVERY MEAL COUNT"
          title="Your food diary"
          sub="A small record of how you nourish yourself."
        />
        <div className="date-switch">
          <button
            aria-label="Previous day"
            onClick={() => setDay((d) => d - 1)}
          >
            <ChevronLeft />
          </button>
          <b>
            {day === 0
              ? "Today, 25 October"
              : day === -1
                ? "Yesterday, 24 October"
                : `${25 + day} October`}
          </b>
          <button
            aria-label="Next day"
            disabled={day === 0}
            onClick={() => setDay((d) => Math.min(0, d + 1))}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="summary-strip">
          <div>
            <strong>{totals.kcal}</strong>
            <small>kcal logged</small>
          </div>
          <div>
            <strong>{Math.max(0, target - totals.kcal)}</strong>
            <small>remaining</small>
          </div>
          <div>
            <strong>{totals.p} g</strong>
            <small>protein</small>
          </div>
        </div>
        {["Breakfast", "Lunch", "Dinner", "Snacks"].map((m) => (
          <section className="meal-section" key={m}>
            <div className="section-title">
              <h2>{m}</h2>
              <button
                className="text-button"
                onClick={() => {
                  setMeal(m);
                  go("Log food");
                }}
              >
                <Plus size={16} /> Add food
              </button>
            </div>
            <div className="card">
              {day === 0 && foods.some((f) => f.meal === m) ? (
                foods
                  .filter((f) => f.meal === m)
                  .map((f) => (
                    <div key={f.id}>
                      <FoodRow food={f} editable />
                      <div className="entry-actions">
                        <button
                          onClick={() => {
                            setSelected(f);
                            setEditing(f.id);
                            setMeal(m);
                            go("Log food");
                          }}
                        >
                          Edit portion
                        </button>
                        <button
                          onClick={() => {
                            setFoods((fs) => [...fs, { ...f, id: Date.now() }]);
                            notify("Meal copied");
                          }}
                        >
                          <Copy size={12} /> Copy
                        </button>
                        <button
                          onClick={() => {
                            setCustom((rs) =>
                              rs.some((r) => r.id === f.id) ? rs : [...rs, f],
                            );
                            setSaved((xs) => [...xs, f.id]);
                            notify("Food saved to favourites");
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <button
                  className="empty-meal"
                  onClick={() => {
                    setMeal(m);
                    go("Log food");
                  }}
                >
                  <Utensils size={19} />
                  <span>What’s for {m.toLowerCase()}?</span>
                  <Plus size={18} />
                </button>
              )}
            </div>
          </section>
        ))}
      </>
    );
  else if (screen === "Log food")
    content = (
      <>
        <Heading
          title="Something delicious?"
          sub="Find your food and make it part of your day."
        />
        <div className="search">
          <Search size={18} />
          <input
            aria-label="Search foods"
            placeholder="Search food, ingredients…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chips">
          {["Recent", "Saved", "All foods"].map((x) => (
            <button
              className={filter === x ? "selected" : ""}
              key={x}
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="section-title">
          <h2>{query ? "Search results" : "Your everyday favourites"}</h2>
        </div>
        {(filter === "Saved"
          ? [...recipes, ...custom].filter((f) => saved.includes(f.id))
          : [...baseFoods, ...recipes, ...custom]
        )
          .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
          .map((f) => (
            <button
              className={
                "select-food card " + (selected.id === f.id ? "chosen" : "")
              }
              key={f.id}
              onClick={() => {
                setSelected(f);
                setEditing(null);
              }}
            >
              <FoodRow food={f} />
            </button>
          ))}
        {!(
          filter === "Saved"
            ? [...recipes, ...custom].filter((f) => saved.includes(f.id))
            : [...baseFoods, ...recipes, ...custom]
        ).some((f) => f.name.toLowerCase().includes(query.toLowerCase())) && (
          <p className="empty">
            No foods found. Try “chicken” or create a recipe.
          </p>
        )}
        <div className="card selection">
          <h3>{selected.name}</h3>
          {mealFields}
          <p className="muted">
            {Math.round(selected.kcal * quantity)} kcal ·{" "}
            {Math.round(selected.p * quantity)} g protein
          </p>
          <Button
            onClick={() => {
              if (editing) {
                setFoods((fs) => fs.filter((f) => f.id !== editing));
                setEditing(null);
              }
              add(selected);
            }}
          >
            <Plus size={16} /> {editing ? "Update entry" : "Add to diary"}
          </Button>
        </div>
      </>
    );
  else if (screen === "Suggestions" || screen === "Recipes")
    content = (
      <>
        <Heading
          eyebrow={
            screen === "Suggestions"
              ? "PERSONALISED FOR YOUR DAY"
              : "GOOD FOOD, GOOD IDEAS"
          }
          title={
            screen === "Suggestions"
              ? "Your next good meal"
              : "The recipe collection"
          }
          sub={
            screen === "Suggestions"
              ? "A little inspiration, shaped around your goals."
              : "Simple recipes worth coming back to."
          }
        />
        {screen === "Suggestions" && (
          <div className="summary-strip">
            <div>
              <strong>{Math.max(0, target - totals.kcal)}</strong>
              <small>kcal left</small>
            </div>
            <div>
              <strong>
                {Math.max(0, nutrientTargets.protein - totals.p)} g
              </strong>
              <small>protein left</small>
            </div>
            <div>
              <Sparkles />
              <small>Demo suggestions</small>
            </div>
          </div>
        )}
        <div className="search">
          <Search size={18} />
          <input
            aria-label="Search recipes"
            placeholder="Find your next favourite…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chips">
          {["All", "High protein", "Vegetarian", "Saved", "Under 20 min"].map(
            (x) => (
              <button
                key={x}
                className={filter === x ? "selected" : ""}
                onClick={() => setFilter(x)}
              >
                {x}
              </button>
            ),
          )}
        </div>
        <div className="recipe-list">
          {(rotation ? [...recipes].reverse() : [...recipes, ...custom])
            .filter(
              (r) =>
                r.name.toLowerCase().includes(query.toLowerCase()) &&
                (filter === "Saved"
                  ? saved.includes(r.id)
                  : filter === "High protein"
                    ? r.p >= 30
                    : filter === "Vegetarian"
                      ? r.tags === "Vegetarian"
                      : filter === "Under 20 min"
                        ? r.time <= 20
                        : true),
            )
            .map((r) => (
              <div key={r.id}>
                <RecipeCard r={r} />
                {screen === "Suggestions" && (
                  <p className="reason">
                    <Sparkles size={14} />{" "}
                    {r.p >= 30
                      ? "A protein-rich option to help close today’s gap."
                      : "A balanced alternative with plenty of variety."}{" "}
                    Check ingredients against your allergies.
                  </p>
                )}
              </div>
            ))}
        </div>
        <Button
          secondary
          onClick={() =>
            screen === "Suggestions"
              ? (setRotation(!rotation), notify("Alternative order generated"))
              : go("Create recipe")
          }
        >
          {screen === "Suggestions"
            ? "Refresh suggestions"
            : "Create your own recipe"}
        </Button>
      </>
    );
  else if (screen === "Recipe detail")
    content = (
      <>
        <FoodArt food={selected} big />
        <div className="detail-head">
          <span className="tag">{selected.tags || "Your recipe"}</span>
          <button
            aria-label="Save recipe"
            onClick={() => {
              setSaved((s) => [...s, selected.id]);
              notify("Recipe saved");
            }}
          >
            <Heart />
          </button>
        </div>
        <Heading
          title={selected.name}
          sub={`${selected.time || 20} minutes · Nutrition per serving`}
        />
        <div className="summary-strip">
          {[
            ["kcal", selected.kcal],
            ["protein", selected.p + " g"],
            ["carbs", selected.c + " g"],
            ["fat", selected.f + " g"],
          ].map(([k, v]) => (
            <div key={k}>
              <strong>{v}</strong>
              <small>{k}</small>
            </div>
          ))}
        </div>
        <h2>Fresh, simple ingredients</h2>
        <div className="card ingredients">
          {(selected.ingredients || ["Ingredients from your saved recipe"]).map(
            (i) => (
              <p key={i}>
                <Check size={16} />
                {i}
              </p>
            ),
          )}
        </div>
        <h2>Let’s make it</h2>
        {[
          "Prepare and measure your ingredients.",
          "Cook the grains and protein until thoroughly cooked.",
          "Arrange with vegetables, dress to taste and enjoy.",
        ].map((s, i) => (
          <div className="method" key={s}>
            <span>{i + 1}</span>
            <p>{s}</p>
          </div>
        ))}
        {mealFields}
        <Button onClick={() => add(selected)}>
          Log {quantity} serving{quantity !== 1 ? "s" : ""} <Plus size={16} />
        </Button>
        <p className="footnote">
          Illustrative demo recipe. Nutrition values are estimates.
        </p>
      </>
    );
  else if (screen === "Barcode" || screen === "AI scan")
    content = (
      <>
        <Heading
          eyebrow={
            screen === "AI scan" ? "A LITTLE HELP FROM AI" : "QUICK & SIMPLE"
          }
          title={
            screen === "AI scan" ? "Snap. Check. Nourish." : "Scan your food"
          }
          sub={
            screen === "AI scan"
              ? "Start with a photo. You’re in control of the details."
              : "Find the barcode on your packaged food."
          }
        />
        {!scan ? (
          <>
            <div className="scanner">
              <div className="scan-corner" />
              {screen === "AI scan" ? (
                <Camera size={64} strokeWidth={1} />
              ) : (
                <ScanBarcode size={100} strokeWidth={1} />
              )}
              <p>
                {screen === "AI scan"
                  ? "Place your meal in the frame"
                  : "Align the barcode inside the frame"}
              </p>
              <small>SIMULATED CAMERA · PROTOTYPE</small>
            </div>
            <Button onClick={() => setScan(true)}>
              {screen === "AI scan" ? (
                <Camera size={18} />
              ) : (
                <ScanBarcode size={18} />
              )}
              Try sample {screen === "AI scan" ? "meal" : "product"}
            </Button>
            {screen === "AI scan" && (
              <label className="button secondary upload">
                <Image size={18} /> Choose a photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setScan(true);
                      notify("Photo selected. Showing sample analysis.");
                    }
                  }}
                />
              </label>
            )}
            <Button secondary onClick={() => go("Log food")}>
              Search food instead
            </Button>
          </>
        ) : (
          <>
            <div className="scan-result">
              <span>{screen === "AI scan" ? "🍚" : "🥛"}</span>
              <h2>
                {screen === "AI scan" ? "Chicken rice" : "Oat milk · Original"}
              </h2>
              <span className="tag">
                {screen === "AI scan"
                  ? "AI estimate · Please review"
                  : "Sample product found"}
              </span>
            </div>
            {screen === "AI scan" && (
              <div className="card ingredients">
                {ingredients.map((i, index) => (
                  <div className="ingredient-edit" key={index}>
                    <input
                      aria-label="Detected ingredient"
                      value={i}
                      onChange={(e) =>
                        setIngredients((xs) =>
                          xs.map((item, idx) =>
                            idx === index ? e.target.value : item,
                          ),
                        )
                      }
                    />
                    <button
                      aria-label={"Remove " + i}
                      onClick={() =>
                        setIngredients((xs) => xs.filter((x) => x !== i))
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <p className="footnote">
                  Check portions, oils and sauces. Results are simulated.
                </p>
              </div>
            )}
            {mealFields}
            <div className="summary-strip">
              <div>
                <strong>
                  {Math.round(
                    (screen === "AI scan" ? ingredients.length * 155 : 120) *
                      quantity,
                  )}
                </strong>
                <small>estimated kcal</small>
              </div>
              <div>
                <strong>
                  {Math.round((screen === "AI scan" ? 38 : 3) * quantity)} g
                </strong>
                <small>protein</small>
              </div>
            </div>
            <Button
              onClick={() =>
                add({
                  name:
                    screen === "AI scan"
                      ? "Chicken rice (AI estimate)"
                      : "Original oat milk",
                  kcal: screen === "AI scan" ? ingredients.length * 155 : 120,
                  p: screen === "AI scan" ? 38 : 3,
                  c: screen === "AI scan" ? 72 : 16,
                  f: screen === "AI scan" ? 18 : 5,
                  art: screen === "AI scan" ? "🍚" : "🥛",
                })
              }
            >
              Confirm & add to diary <Check size={17} />
            </Button>
            <Button secondary onClick={() => setScan(false)}>
              Try again
            </Button>
          </>
        )}
      </>
    );
  else if (screen === "Insights")
    content = (
      <>
        <Heading
          eyebrow="THE BIGGER PICTURE"
          title="Small steps. Real progress."
          sub="Get to know the patterns that nourish you."
        />
        <div className="segmented">
          {["Day", "Week", "Month"].map((p) => (
            <button
              key={p}
              className={period === p ? "selected" : ""}
              onClick={() => {
                if (p === "Week" && !premium) go("Premium");
                else setPeriod(p);
              }}
            >
              {p}
              {p === "Week" && !premium ? " ✦" : ""}
            </button>
          ))}
        </div>
        <div className="card chart-card">
          <div className="eyebrow">
            {period.toUpperCase()}LY ENERGY · DEMO DATA
          </div>
          <div className="stat">
            <strong>{period === "Day" ? totals.kcal : "2,185"}</strong>
            <span>kcal {period === "Day" ? "today" : "daily average"}</span>
          </div>
          <div className="chart">
            <div className="target-line">
              <span>Target {target}</span>
            </div>
            {[
              58,
              76,
              68,
              89,
              72,
              82,
              Math.min(100, (totals.kcal / target) * 90),
            ].map((v, i) => (
              <button
                key={i}
                aria-label={`Inspect ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i]}`}
                onClick={() => setChartDay(i)}
                className={chartDay === i ? "bar active" : "bar"}
                style={{ height: v + "%" }}
              >
                <span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
              </button>
            ))}
          </div>
          <p className="chart-caption">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][chartDay]} ·{" "}
            {chartDay === 6
              ? totals.kcal
              : Math.round(
                  ([58, 76, 68, 89, 72, 82][chartDay] / 90) * target,
                )}{" "}
            kcal logged
          </p>
        </div>
        <div className="insight-card">
          <Sparkles />
          <div>
            <h3>You’re building a rhythm</h3>
            <p>
              Protein target reached on 5 of 7 sample days. Keep choosing foods
              you enjoy.
            </p>
          </div>
        </div>
        <div className="section-title">
          <h2>Your nutrient balance</h2>
          <span className="tag">Today</span>
        </div>
        <div className="card selection">
          <Macro
            label="Protein"
            value={totals.p}
            max={nutrientTargets.protein}
            color="#537d60"
          />
          <Macro
            label="Carbohydrates"
            value={totals.c}
            max={nutrientTargets.carbs}
            color="#e4b979"
          />
          <Macro
            label="Fat"
            value={totals.f}
            max={nutrientTargets.fat}
            color="#b6a6c7"
          />
        </div>
        <div className="section-title">
          <h2>Look a little deeper</h2>
          <span className="tag">Premium</span>
        </div>
        {premium ? (
          <div className="card selection">
            <Macro
              label="Fibre · sample"
              value={18}
              max={nutrientTargets.fibre}
              color="#537d60"
            />
            <Macro
              label="Iron · sample mg"
              value={12}
              max={18}
              color="#d5aa79"
            />
            <p className="muted">
              Try beans, whole grains and leafy greens for more variety.
            </p>
          </div>
        ) : (
          <div className="card selection">
            <h3>See the patterns behind your progress</h3>
            <p>Explore nutrient trends and weekly comparisons.</p>
            <Button onClick={() => go("Premium")}>
              Explore Premium <Sparkles size={16} />
            </Button>
          </div>
        )}
        <p className="footnote">
          Charts use illustrative data except today’s totals. Food logs cannot
          diagnose deficiencies; unlogged food is not zero intake.
        </p>
      </>
    );
  else if (screen === "Profile")
    content = (
      <>
        <Heading
          title="Made for you"
          sub="Your goals, your preferences, your pace."
        />
        <div className="profile-card">
          <div className="avatar large">{name.slice(0, 1)}</div>
          <h2>{name}’s space</h2>
          <span className="tag">
            {premium ? "✦ Premium demo" : "Free demo"}
          </span>
          <p>
            {goal} · {target.toLocaleString()} kcal daily
          </p>
          <small>
            {diet} · Allergies: {allergies}
          </small>
        </div>
        {[
          [
            "Your nutrition",
            [
              ["Goals & daily targets", "Targets"],
              ["Food preferences & allergies", "Settings"],
              ["Saved recipes", "Recipes"],
            ],
          ],
          [
            "Your account",
            [
              ["Personal information", "Onboarding"],
              ["Subscription", "Premium"],
              ["Notifications & privacy", "Settings"],
            ],
          ],
        ].map(([heading, items]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <div className="card menu-list">
              {items.map(([label, dest]) => (
                <button
                  key={label}
                  onClick={() => {
                    if (dest === "Onboarding") setStep(1);
                    go(dest);
                  }}
                >
                  {label}
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
          </section>
        ))}
        <div className="demo-controls">
          <div>
            <b>Prototype controls</b>
            <p>Explore both subscription experiences.</p>
          </div>
          <button
            role="switch"
            aria-checked={premium}
            className={"toggle " + (premium ? "on" : "")}
            onClick={() => setPremium(!premium)}
          >
            <span />
          </button>
        </div>
        <Button secondary onClick={() => go("Welcome")}>
          Return to welcome
        </Button>
      </>
    );
  else if (screen === "Targets")
    content = (
      <>
        <Heading
          eyebrow="YOUR PERSONAL STARTING POINT"
          title="A goal that fits your life"
          sub="These demo targets are a starting point, not a prescription."
        />
        <label>
          Your focus
          <select
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              setTarget(
                e.target.value === "Muscle gain"
                  ? 2400
                  : e.target.value === "Weight loss"
                    ? 1900
                    : 2200,
              );
            }}
          >
            {[
              "Weight loss",
              "Weight maintenance",
              "Muscle gain",
              "General healthy eating",
              "Healthy prenatal nutrition",
            ].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <div className="card selection">
          <label>
            Daily energy · kcal
            <input
              type="number"
              min="1000"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            />
          </label>
          {[
            ["Protein", "protein"],
            ["Carbohydrates", "carbs"],
            ["Fat", "fat"],
            ["Fibre", "fibre"],
          ].map(([label, key]) => (
            <label className="target-edit" key={key}>
              {label} · grams
              <input
                type="number"
                min="1"
                value={nutrientTargets[key]}
                onChange={(e) =>
                  setNutrientTargets((v) => ({
                    ...v,
                    [key]: Math.max(1, Number(e.target.value)),
                  }))
                }
              />
            </label>
          ))}
        </div>
        {goal.includes("prenatal") && (
          <div className="insight-card">
            <Leaf />
            <p>
              Prioritise nourishment and relevant nutrients including folate,
              iron and calcium. Review individual needs with your healthcare
              professional.
            </p>
          </div>
        )}
        <Button
          onClick={() => {
            go("Home");
            notify("Your starting targets have been updated");
          }}
        >
          Save targets <Check size={16} />
        </Button>
        <p className="footnote">
          Mock calculations for demonstration only. Review individual nutrition
          requirements with a qualified professional.
        </p>
      </>
    );
  else if (screen === "Settings")
    content = (
      <>
        <Heading
          title="Your preferences"
          sub="Make NutriGoal feel a little more like you."
        />
        <div className="card selection">
          <label>
            Preferred name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Dietary preference
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
              {["No preference", "Vegetarian", "Vegan", "Halal"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Allergies & restrictions
            <input
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </label>
          <p className="footnote">
            Demo suggestions are not allergy-validated. Always check
            ingredients.
          </p>
          <div className="target-row">
            <span>Gentle reminders</span>
            <button
              role="switch"
              aria-checked={notifications}
              className={"toggle " + (notifications ? "on" : "")}
              onClick={() => setNotifications(!notifications)}
            >
              <span />
            </button>
          </div>
        </div>
        <Button
          onClick={() => {
            notify("Preferences saved on this browser");
            go("Profile");
          }}
        >
          Save preferences
        </Button>
        <h2>Your data, your choice</h2>
        <Button
          secondary
          onClick={() =>
            download(
              new Blob(
                [
                  JSON.stringify(
                    { name, goal, foods, diet, allergies },
                    null,
                    2,
                  ),
                ],
                { type: "application/json" },
              ),
              "nutrigoal-data.json",
            )
          }
        >
          <Download size={17} /> Export demo data
        </Button>
        <Button secondary onClick={() => setDeleteConfirm(true)}>
          <Trash2 size={16} /> Clear demo diary
        </Button>
        {deleteConfirm && (
          <div className="card selection">
            <h3>Clear all diary entries?</h3>
            <p>This removes the browser’s logged foods.</p>
            <Button
              onClick={() => {
                setFoods([]);
                setDeleteConfirm(false);
                notify("Demo diary cleared");
              }}
            >
              Confirm clear
            </Button>
            <Button secondary onClick={() => setDeleteConfirm(false)}>
              Keep my diary
            </Button>
          </div>
        )}
      </>
    );
  else if (screen === "Create recipe")
    content = (
      <>
        <Heading
          title="Make it your own"
          sub="Save the meals you love, just the way you make them."
        />
        <label>
          Recipe name
          <input
            placeholder="e.g. Mum’s lentil soup"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </label>
        <label>
          Number of servings
          <input
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(Math.max(1, Number(e.target.value)))}
          />
        </label>
        <label>
          Add ingredient
          <input
            placeholder="e.g. 200 g cooked lentils"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </label>
        <Button
          secondary
          onClick={() => {
            if (ingredient.trim()) {
              setIngredients((xs) => [...xs, ingredient.trim()]);
              setIngredient("");
            }
          }}
        >
          <Plus size={16} /> Add ingredient
        </Button>
        <div className="card ingredients">
          {ingredients.map((i) => (
            <div className="ingredient-edit" key={i}>
              <span>{i}</span>
              <button
                aria-label={"Remove " + i}
                onClick={() =>
                  setIngredients((xs) => xs.filter((x) => x !== i))
                }
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
        <div className="summary-strip">
          <div>
            <strong>{Math.round((ingredients.length * 120) / servings)}</strong>
            <small>sample kcal / serving</small>
          </div>
          <div>
            <strong>{servings}</strong>
            <small>servings</small>
          </div>
        </div>
        <p className="footnote">
          Ingredient nutrition is a placeholder, not calculated from a database.
        </p>
        <Button
          disabled={!recipeName.trim() || !ingredients.length}
          onClick={() => {
            const r = {
              id: Date.now(),
              name: recipeName,
              kcal: Math.round((ingredients.length * 120) / servings),
              p: 20,
              c: 40,
              f: 12,
              art: "🥣",
              ingredients: [...ingredients],
              time: 25,
              tags: "My recipe",
            };
            setCustom((rs) => [...rs, r]);
            setSelected(r);
            go("Recipe detail");
            notify("Your recipe is saved");
          }}
        >
          Save recipe <Check size={16} />
        </Button>
      </>
    );
  else if (screen === "Premium")
    content = (
      <>
        <div className="premium-hero">
          <div className="premium-orbit">
            <Sparkles size={45} />
          </div>
          <span className="eyebrow">NUTRIGOAL PLUS</span>
          <h1>
            A little more insight.
            <br />A lot more possibility.
          </h1>
          <p>Less guesswork. More room to enjoy your food.</p>
        </div>
        {[
          [
            "Photo meal logging",
            "Snap a meal, review the details, get on with your day.",
          ],
          [
            "Meals that fit your goals",
            "Thoughtful ideas based on what your day needs.",
          ],
          [
            "The bigger picture",
            "Explore nutrient patterns over weeks and months.",
          ],
        ].map(([t, p]) => (
          <div className="benefit" key={t}>
            <Check size={19} />
            <div>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          </div>
        ))}
        <div className="plan-options">
          {[false, true].map((a) => (
            <button
              key={String(a)}
              className={annual === a ? "plan selected" : "plan"}
              onClick={() => setAnnual(a)}
            >
              <b>{a ? "Annual" : "Monthly"}</b>
              <strong>
                {a ? "$39.99" : "$4.99"}
                <small> / {a ? "year" : "month"}</small>
              </strong>
              <span>
                {a
                  ? "Best value · Placeholder price"
                  : "Flexible · Placeholder price"}
              </span>
            </button>
          ))}
        </div>
        <Button
          onClick={() => {
            setPremium(true);
            go("Home");
            notify("Premium demo enabled. No payment was made.");
          }}
        >
          Try Premium demo <Sparkles size={17} />
        </Button>
        <Button secondary onClick={() => go("Home")}>
          Continue with current plan
        </Button>
        <p className="footnote">
          Prototype only. Prices are placeholders. No billing or subscription is
          created. Free includes diary, barcode, recipes and basic reports.
        </p>
      </>
    );
  else if (screen === "Account")
    content = (
      <>
        <Heading
          eyebrow="YOUR NUTRITION, YOUR SPACE"
          title={
            authMode === "Sign up" ? "A fresh beginning." : "Welcome back."
          }
          sub="This is a demo account screen. No information is sent to a server."
        />
        <div className="segmented">
          {["Sign up", "Log in"].map((m) => (
            <button
              className={authMode === m ? "selected" : ""}
              key={m}
              onClick={() => setAuthMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (authMode === "Sign up") {
              setStep(0);
              go("Onboarding");
            } else go("Home");
            notify("Demo account only. No real authentication performed.");
          }}
        >
          <label>
            Email
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              required
              type="password"
              minLength={8}
              placeholder="At least 8 characters"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
            />
          </label>
          <Button type="submit">
            {authMode === "Sign up"
              ? "Create demo account"
              : "Enter demo account"}{" "}
            <ArrowUpRight size={16} />
          </Button>
        </form>
        <div className="auth-divider">or explore with</div>
        {["Google", "Apple"].map((provider) => (
          <Button
            key={provider}
            secondary
            onClick={() => {
              go("Home");
              notify(provider + " sign-in simulated. No account connected.");
            }}
          >
            {provider === "Google" ? "G" : "●"} Continue with {provider}
          </Button>
        ))}
        <p className="footnote">
          Use fictional details. Social sign-in and email authentication are
          simulated. Passwords are never saved.
        </p>
      </>
    );
  else if (screen === "Welcome")
    content = (
      <>
        <div className="welcome-art">
          <Leaf size={32} />
          <span className="floating-food f1">🥑</span>
          <span className="floating-food f2">🥗</span>
          <span className="floating-food f3">🍋</span>
          <div>
            Good food.
            <br />
            Your way.
          </div>
        </div>
        <Heading
          eyebrow="WELCOME TO NUTRIGOAL AI"
          title="Feel good about what’s on your plate."
          sub="Understand your nutrition. Discover your rhythm. Build habits that feel like you."
        />
        <Button
          onClick={() => {
            setStep(0);
            go("Onboarding");
          }}
        >
          Find your starting point <ArrowUpRight size={17} />
        </Button>
        <Button secondary onClick={() => go("Account")}>
          Sign up or log in
        </Button>
        <button className="welcome-demo text-button" onClick={() => go("Home")}>
          Just exploring? Enter the demo <ArrowUpRight size={14} />
        </button>
        <p className="footnote">Interactive prototype · No account required</p>
      </>
    );
  else if (screen === "Onboarding")
    content = (
      <>
        <div className="onboard-progress">
          {[0, 1, 2, 3, 4].map((x) => (
            <i key={x} className={x <= step ? "done" : ""} />
          ))}
        </div>
        <Heading
          eyebrow={`YOUR STARTING POINT · ${step + 1} OF 5`}
          title={
            [
              "What brings you here?",
              "A little about you",
              "Your everyday rhythm",
              "What’s on your menu?",
              "You’re ready to begin",
            ][step]
          }
          sub={
            [
              "There’s no perfect goal. Just the one that feels right for you.",
              "Help us shape your demo starting targets.",
              "Choose the description closest to your typical week.",
              "Your preferences make this experience yours.",
              "Review your starting targets and make them your own.",
            ][step]
          }
        />
        {step === 0 ? (
          <div className="goal-options">
            {[
              "Weight loss",
              "Weight maintenance",
              "Muscle gain",
              "General healthy eating",
              "Healthy prenatal nutrition",
            ].map((g, i) => (
              <button
                className={goal === g ? "selected" : ""}
                key={g}
                onClick={() => {
                  setGoal(g);
                  setTarget(
                    g === "Muscle gain"
                      ? 2400
                      : g === "Weight loss"
                        ? 1900
                        : 2200,
                  );
                }}
              >
                <span>{["🌿", "⚖️", "💪", "🥑", "🌸"][i]}</span>
                <div>
                  <b>{g}</b>
                  <small>
                    {
                      [
                        "Build sustainable daily habits",
                        "Find a comfortable balance",
                        "Fuel strength and recovery",
                        "Nourish yourself with variety",
                        "Support a nourishing pregnancy",
                      ][i]
                    }
                  </small>
                </div>
                {goal === g && <Check size={18} />}
              </button>
            ))}
          </div>
        ) : step === 1 ? (
          <div className="fields">
            <label>
              What should we call you?
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div className="two fields">
              <label>
                Age
                <input type="number" defaultValue="25" min="18" />
              </label>
              <label>
                Sex for estimates
                <select>
                  <option>Prefer not to say</option>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </label>
              <label>
                Height · cm
                <input type="number" defaultValue="172" />
              </label>
              <label>
                Weight · kg
                <input type="number" defaultValue="68" />
              </label>
            </div>
            {goal.includes("prenatal") && (
              <label>
                Trimester
                <select>
                  <option>First trimester</option>
                  <option>Second trimester</option>
                  <option>Third trimester</option>
                </select>
              </label>
            )}
          </div>
        ) : step === 2 ? (
          <div className="goal-options">
            {[
              "Mostly seated",
              "Lightly active",
              "Moderately active",
              "Very active",
            ].map((x, i) => (
              <button
                key={x}
                onClick={(e) => {
                  document
                    .querySelectorAll(".goal-options button")
                    .forEach((b) => b.classList.remove("selected"));
                  e.currentTarget.classList.add("selected");
                }}
              >
                <span>{["🪴", "🚶", "🚲", "🏃"][i]}</span>
                <div>
                  <b>{x}</b>
                  <small>
                    {
                      [
                        "Desk-based days, little exercise",
                        "Some walking and gentle movement",
                        "Regular movement, 3–5 days a week",
                        "Frequent training or physical work",
                      ][i]
                    }
                  </small>
                </div>
              </button>
            ))}
          </div>
        ) : step === 3 ? (
          <>
            <label>
              Dietary preference
              <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                {["No preference", "Vegetarian", "Vegan", "Halal"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Allergies & restrictions
              <input
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </label>
            <p className="footnote">
              Please check recipe ingredients. This prototype does not validate
              allergens.
            </p>
          </>
        ) : (
          <>
            <div className="profile-card">
              <Leaf size={30} />
              <h2>{goal}</h2>
              <strong className="big-number">
                {target} <small>kcal</small>
              </strong>
              <p>
                {nutrientTargets.protein} g protein · {nutrientTargets.carbs} g
                carbs · {nutrientTargets.fat} g fat
              </p>
              <span className="tag">Demo estimates</span>
            </div>
            <label>
              Email · optional for demo
              <input type="email" placeholder="you@example.com" />
            </label>
            <p className="footnote">
              No registration or authentication occurs. These targets are
              illustrative; seek professional advice for individual
              requirements.
            </p>
          </>
        )}
        <div className="onboard-buttons">
          {step > 0 && (
            <Button secondary onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          <Button
            onClick={() => (step < 4 ? setStep((s) => s + 1) : go("Home"))}
          >
            {step === 4 ? "Let’s get started" : "Continue"}{" "}
            <ChevronRight size={16} />
          </Button>
        </div>
      </>
    );
  return (
    <div className="studio">
      <aside className="studio-sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("Home");
          }}
        >
          <span>
            <Leaf size={25} />
          </span>
          nutrigoal<span className="brand-ai">AI</span>
        </a>
        <div className="studio-intro">
          <div className="eyebrow">THE INTERFACE COLLECTION</div>
          <h2>
            Designed around
            <br />a healthier everyday.
          </h2>
          <p>
            A connected mobile prototype.
            <br />
            Made to explore, ready to refine.
          </p>
        </div>
        <div className="screen-links">
          {screens.map((s, i) => (
            <button
              className={screen === s ? "active" : ""}
              key={s}
              onClick={() => {
                if (s === "Create recipe") setIngredients([]);
                go(s);
              }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {s}
              {screen === s && <ArrowUpRight size={15} />}
            </button>
          ))}
        </div>
        <div className="studio-footer">
          <span className="live-dot" /> Interactive prototype · v1.0
          <p>All nutrition, AI and account data are demonstrations.</p>
        </div>
      </aside>
      <main className="canvas">
        <div className="canvas-toolbar">
          <div>
            <span className="eyebrow">MOBILE EXPERIENCE</span>
            <p>
              {screen} <span>/ NutriGoal AI</span>
            </p>
          </div>
          <button className="export-button" onClick={exportSVG}>
            <Download size={16} />
            <span>Export screen to Figma</span>
          </button>
        </div>
        <div className="phone" data-screen={screen}>
          <div className="status-bar">
            <b>9:41</b>
            <span>●●● ▰ ▰</span>
          </div>
          <header className="app-header">
            <button className="app-wordmark" onClick={() => go("Home")}>
              <Leaf size={20} /> nutrigoal<span>AI</span>
            </button>
            {!["Home", "Diary", "Insights", "Profile", "Welcome"].includes(
              screen,
            ) ? (
              <button aria-label="Back" className="icon-button" onClick={back}>
                <ArrowLeft size={20} />
              </button>
            ) : (
              <button
                aria-label="Settings"
                className="icon-button"
                onClick={() => go("Settings")}
              >
                <Settings size={19} />
              </button>
            )}
          </header>
          <div className="screen-content">{content}</div>
          <div className="demo-caption">
            DEMO EXPERIENCE · NUTRITION VALUES ARE ESTIMATES
          </div>
          <nav className="bottom-nav" aria-label="Main navigation">
            {[
              ["Home", Home],
              ["Diary", BookOpen],
              ["Log", Plus],
              ["Insights", ChartNoAxesCombined],
              ["Profile", User],
            ].map(([label, Icon]) => (
              <button
                key={label}
                className={
                  (screen === label ? "active " : "") +
                  (label === "Log" ? "log-nav" : "")
                }
                onClick={() => (label === "Log" ? setSheet(true) : go(label))}
                aria-label={label}
              >
                <span>
                  <Icon size={21} />
                </span>
                <small>{label}</small>
              </button>
            ))}
          </nav>
          <div className="home-indicator" />
          {sheet && (
            <div className="sheet-backdrop" onClick={() => setSheet(false)}>
              <section
                className="bottom-sheet"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sheet-handle" />
                <div className="section-title">
                  <h2>A little nourishment</h2>
                  <button aria-label="Close" onClick={() => setSheet(false)}>
                    <X size={20} />
                  </button>
                </div>
                <p>How would you like to log your meal?</p>
                {[
                  [
                    "Search food",
                    Search,
                    "Log food",
                    "Your favourites, a few taps away",
                  ],
                  [
                    "Scan a barcode",
                    ScanBarcode,
                    "Barcode",
                    "Packaged food made simple",
                  ],
                  [
                    "Scan a meal photo",
                    Camera,
                    "AI scan",
                    "AI-powered · Premium",
                  ],
                  [
                    "Create a recipe",
                    Utensils,
                    "Create recipe",
                    "Save something you love",
                  ],
                ].map(([title, Icon, dest, sub]) => (
                  <button
                    className="sheet-option"
                    key={dest}
                    onClick={() => {
                      if (dest === "Create recipe") setIngredients([]);
                      dest === "AI scan" ? protect(dest) : go(dest);
                    }}
                  >
                    <span>
                      <Icon size={22} />
                    </span>
                    <div>
                      <b>{title}</b>
                      <small>{sub}</small>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                ))}
              </section>
            </div>
          )}
        </div>
        <div className="canvas-note">
          <span className="live-dot" /> Click, explore, make it yours.{" "}
          <span>SVG exports contain vector shapes and text.</span>
        </div>
      </main>
      <aside className="design-notes">
        <div className="eyebrow">DESIGN NOTES</div>
        <h3>
          A softer approach
          <br />
          to daily nutrition.
        </h3>
        <p>Warm neutrals. Botanical greens. Space to breathe.</p>
        <div className="swatches">
          <i />
          <i />
          <i />
          <i />
        </div>
        <hr />
        <span className="eyebrow">FIGMA HANDOFF</span>
        <ol>
          <li>Choose a screen on the left.</li>
          <li>Export the SVG above.</li>
          <li>Drag the file into Figma.</li>
          <li>Arrange screens and add prototype connections.</li>
        </ol>
        <p className="note-small">
          SVGs are static wireframes, without Auto Layout. Figma may outline
          text. Emoji and effects can vary on import.
        </p>
        <hr />
        <span className="eyebrow">DEMO MODE</span>
        <button
          className="demo-plan"
          onClick={() => {
            setPremium(!premium);
            notify(premium ? "Free demo enabled" : "Premium demo enabled");
          }}
        >
          <Sparkles size={16} />
          {premium ? "Premium" : "Free"}
          <span>Switch</span>
        </button>
        <p className="note-small">
          Demo changes are saved in this browser. No real account, payment,
          camera analysis or medical calculations.
        </p>
      </aside>
      {toast && (
        <div role="status" className="toast">
          <CheckCheck size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
