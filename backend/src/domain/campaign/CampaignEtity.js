class Campaign {
  constructor({
    id,
    user_id,
    name,
    description,
    created_at,
    start_date,
    quantity,
    budget,
    // updated_at,
    // deleted_at = null,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.description = description || "";
    this.start_date = start_date;
    this.quantity = quantity;
    this.budget = budget;
    this.created_at = created_at ? new Date(created_at) : new Date();
    // this.updated_at = updated_at ? new Date(updated_at) : new Date();
    // this.deleted_at = deleted_at ? new Date(deleted_at) : null;
  }

  static create({
    user_id,
    name,
    description,
    // created_at,
    start_date,
    quantity,
    budget,
  }) {
    if (!user_id) throw new Error("user_id is required");
    if (!name || name.trim().length === 0) throw new Error("name is required");
    return new Campaign({
      user_id,
      name: name.trim(),
      description: description?.trim(),
      start_date,
      quantity,
      budget,
    });
  }

  update({ name, description, start_date, quantity, budget }) {
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("name is required and must be a non-empty string");
      }
      this.name = name.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        throw new Error("description must be a string");
      }
      this.description = description.trim();
    }

    if (start_date !== undefined) {
      if (start_date !== null && isNaN(Date.parse(start_date))) {
        throw new Error("start_date must be a valid date or null");
      }
      this.start_date = start_date ? new Date(start_date) : null;
    }

    if (quantity !== undefined) {
      if (quantity !== null && (typeof budget !== "number" || budget < 0)) {
        throw new Error("quantity must be a number");
      }
      this.quantity = quantity;
    }

    if (budget !== undefined) {
      if (budget !== null && (typeof budget !== "number" || budget < 0)) {
        throw new Error("budget must be a non-negative number or null");
      }
      this.budget = budget;
    }


    return this;
  }

  // Soft delete bằng cách set deleted_at
  softDelete() {
    this.deleted_at = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      start_date: this.start_date,
      quantity: this.quantity,
      budget: this.budget,
    };
  }
}

module.exports = Campaign;
