import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProps } from "@/types/user";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { UpdateUserProfile } from "../../_actions/user";
import Image from "next/image";

export default function EditProfileSection({
  id,
  name,
  email,
  image,
}: UserProps) {
  const [newName, setNewName] = useState(name);
  const [imagepath, setImagepath] = useState(image);
  return (
    <form
      action={() => UpdateUserProfile(id, { newName, imagepath })}
      className="space-y-8"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={user.name}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={user == null} />
        {product != null && (
          <Image
            src={image}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
