import React, { useState, useEffect } from "react";
import css from "./../styles/Profile.module.css";
import Avatar from "./../assets/Avatar.png";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  ALLERGY_OPTIONS,
  INTOLERANCE_OPTIONS,
  AVOID_INGREDIENT_OPTIONS,
  DIETARY_TAG_OPTIONS,
  REQUIRED_TAG_OPTIONS,
} from "../data/restrictionOptions";
import {
  Autocomplete,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { NAVBAR } from "../routes/routes";
import { DietaryRestrictions } from "../types/user";
import {
  getUserProfile,
  subscribeDietaryRestrictions,
  addRestriction,
  removeRestriction,
} from "../services/userService";

const Profile: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;
  const [name, setName] = useState<string>(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState<string>(Avatar);
  const [restrictions, setRestrictions] = useState<DietaryRestrictions>({
    allergies: [],
    intolerances: [],
    avoidIngredients: [],
    dietaryTags: [],
    requiredTags: [],
    calorieLimitPerMeal: undefined,
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    /* one‑time profile fetch */
    (async () => {
      const prof = await getUserProfile(userId);
      if (prof?.photoURL) setPhotoURL(prof.photoURL);
      if (prof?.displayName) setName(prof.displayName);
    })();

    /* realtime listener for restrictions */
    const unsub = subscribeDietaryRestrictions(userId, (r) => {
      if (r) setRestrictions(r); // keeps UI in sync live
    });

    return unsub;
  }, [userId]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate(NAVBAR.LOGIN, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: name });
    navigate(NAVBAR.PROFILE, { replace: true });
  };

  const renderChipInput = (
    label: string,
    fieldKey: keyof DietaryRestrictions,
    placeholder: string,
    options: string[] = []
  ) => (
    <Card className={css.restrictionCard}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
        <Autocomplete<string, true, true, true>
          multiple
          freeSolo
          options={options}
          //value={restrictions[fieldKey] as string[]}
          value={
            Array.isArray(restrictions[fieldKey])
              ? (restrictions[fieldKey] as string[])
              : []
          }
          onChange={(_, newValue, reason, details) => {
            // optimistic local update
            setRestrictions((prev) => ({ ...prev, [fieldKey]: newValue }));

            if (!userId || !details?.option) return;

            const chip = details.option as string;
            if (reason === "selectOption" || reason === "createOption") {
              addRestriction(userId, fieldKey, chip); // 🔸 add in DB
            }
            if (reason === "removeOption") {
              removeRestriction(userId, fieldKey, chip); // 🔸 remove in DB
            }
          }}
          sx={{
            // TODO: Styling should be moved to css
            "& .MuiChip-root": {
              background: "#d1e6f9",
              fontFamily:
                "Patrick Hand SC, Open Sans, Times New Roman, sans-serif",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label={placeholder}
              InputProps={{
                ...params.InputProps,
                style: {
                  // TODO: Styling should be moved to css
                  backgroundColor: "rgba(226, 240, 252, 0.5)",
                  borderRadius: 10,
                  fontFamily:
                    "Patrick Hand SC, Open Sans, Times New Roman, sans-serif",
                },
              }}
            />
          )}
        />
      </CardContent>
    </Card>
  );

  return (
    <main className={css.container}>
      {/* Header row: photo + editable name/email */}
      <section className={css.headerRow}>
        <div className={css.avatarColumn}>
          <img src={photoURL} alt="Avatar" className={css.avatarImg} />
          <TextField
            type="file"
            onChange={(e) => setPhotoURL(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </div>

        <div className={css.infoColumn}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                // TODO: Styling should be moved to css
                backgroundColor: "rgba(226, 240, 252, 0.5)",
                borderRadius: 10,
                fontFamily:
                  "Patrick Hand SC, Open Sans, Times New Roman, sans-serif",
              },
            }}
          />
          <TextField
            label="Email"
            value={user?.email || ""}
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                // TODO: Styling should be moved to css
                backgroundColor: "rgba(226, 240, 252, 0.5)",
                borderRadius: 10,
                fontFamily:
                  "Patrick Hand SC, Open Sans, Times New Roman, sans-serif",
              },
              readOnly: true,
            }}
          />
        </div>
      </section>

      {/* Restrictions grid */}
      <form onSubmit={handleSubmit} className={`${css.form} ${css.formGrid}`}>
        {renderChipInput(
          "Allergies",
          "allergies",
          "e.g. peanuts, soy",
          ALLERGY_OPTIONS
        )}
        {renderChipInput(
          "Intolerances",
          "intolerances",
          "e.g. lactose, gluten",
          INTOLERANCE_OPTIONS
        )}
        {renderChipInput(
          "Avoid Ingredients",
          "avoidIngredients",
          "e.g. mushrooms, anchovies",
          AVOID_INGREDIENT_OPTIONS
        )}
        {renderChipInput(
          "Dietary Tags",
          "dietaryTags",
          "e.g. vegan, halal",
          DIETARY_TAG_OPTIONS
        )}
        {renderChipInput(
          "Required Tags",
          "requiredTags",
          "e.g. high protein",
          REQUIRED_TAG_OPTIONS
        )}
        <Card className={css.restrictionCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Add any additional info here..."
              value={restrictions.notes}
              onChange={(e) =>
                setRestrictions({ ...restrictions, notes: e.target.value })
              }
              InputProps={{
                style: {
                  backgroundColor: "rgba(226, 240, 252, 0.5)",
                  borderRadius: 10,
                },
              }}
            />
          </CardContent>
        </Card>
        <button type="submit" className={css.profileUpdateButton}>
          Save
        </button>
      </form>

      {/* Logout button */}
      <section className={css.options}>
        {user && (
          <Button
            variant="text"
            onClick={handleLogout}
            sx={{
              fontFamily:
                "Patrick Hand SC, Open Sans, Times New Roman, sans-serif",
              fontSize: 18,
              border: 1,
            }}
          >
            Logout
          </Button>
        )}
      </section>
    </main>
  );
};

export default Profile;
