const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  // find all categories along with its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, attributes: { exclude: ['category_id'] } }]
    });

    res.status(200).json(categories);
  } catch(err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value along with its associated Products
  try {  
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: { exclude: ['category_id'] } }]
    });

    // if no category found with this id, return 404
    if(!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(category);
  } catch(err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category_name = req.body.category_name; 
    // if no category_name provided, return 400
    if(!category_name) {
      res.status(400).json({ message: 'Please provide a category name' });
      return;
    }

    const category = await Category.create({ category_name });

    res.status(200).json(category);
  } catch(err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category_name = req.body.category_name; 

    // if no category_name provided, return 400
    if(!category_name) {
      res.status(400).json({ message: 'Please provide a category name' });
      return;
    }

    const category = await Category.update({ category_name }, {
      where: { id: req.params.id }
    });

    // if no category found with this id, return 404
    if(category[0] === 0) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json({ message: 'Category updated' });
  } catch(err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;

    // delete all products associated with this category
    const productsDeleted = await Product.destroy({ where: { category_id: categoryId }});

    const category = await Category.destroy({
      where: { id: categoryId }
    });

    // if no category found with this id, return 404
    if(!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    // if products were deleted along with the category, message back that products were deleted
    if(productsDeleted > 0)
      res.status(200).json({ message: 'Category and associated products deleted' });
    else
      res.status(200).json({ message: 'Category deleted' });
  } catch(err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

module.exports = router;
