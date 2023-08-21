export type PetProps = {
  id: Number;
  name: string;
  type: "DOG" | "CAT";
  breed: string;
  weight: number | null;
  height: number | null;
  birth: Date | null;
  createdOn: Date;
  updatedOn: Date;
};
