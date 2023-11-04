const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags along with its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, attributes: { exclude: ['category_id'] } }]
    });

    res.status(200).json(tags);
  } catch(err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` along with its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, attributes: { exclude: ['category_id'] } }]
    });

    // if no tag found with this id, return 404
    if(!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tag);
  } catch(err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag_name = req.body.tag_name; 

    // if no tag_name provided, return 400
    if(!tag_name) {
      res.status(400).json({ message: 'Please provide a tag name' });
      return;
    }

    const tag = await Tag.create({ tag_name });

    res.status(200).json(tag);
  } catch (err) {
    // Server error, return 500
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag_name = req.body.tag_name; 
    // if no tag_name provided, return 400
    if(!tag_name) {
      res.status(400).json({ message: 'Please provide a tag name' });
      return;
    }

    const tag = await Tag.update({ tag_name }, { where: { id: req.params.id } });

    // if no tag found with this id, return 404
    if(tag[0] === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({ message: 'Tag updated' });
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({ where: { id: req.params.id } });

    // if no tag found with this id, return 404
    if(!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted' });
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
