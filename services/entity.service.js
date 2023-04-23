export class EntityService {
  constructor(model) {
    this.model = model;
  }

  async findById(id, relations) {
    return this.model.findById(id).populate(relations);
  }

  async findOne(query, relations) {
    return this.model.findOne(query).populate(relations);
  }

  async find(query, relations) {
    return this.model.find(query).populate(relations);
  }

  async create(payload) {
    return this.model.create(payload);
  }

  async update(query, payload) {
    return this.model.findOneAndUpdate(query, payload, {
      new: true,
    });
  }

  async delete(query) {
    return this.model.deleteOne(query);
  }
}
