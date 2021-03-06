<?php

namespace Dagora\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM,
    TE\DoctrineBehaviorsBundle as Behaviors,
    TE\SearchifyBundle\Model\Searchable;

/**
 * Dagora\CoreBundle\Entity\Source
 *
 * @ORM\Table("source")
 * @ORM\Entity(repositoryClass="Dagora\CoreBundle\Entity\SourceRepository")
 */
class Source
{
    use Behaviors\Model\JSONBindable,
        Behaviors\Model\Timestampable,
        Searchable;

    /**
     * Allowed parameters to bind
     *
     * @var array
     */
    protected static $allowedParams = array('title', 'link', 'unit');

    /**
     * Fields to get from searchify
     */
    public static $fieldsToIndex = array('o.id as id', 'title', 'updated_at');

    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string $title
     *
     * @ORM\Column(name="title", type="string")
     */
    private $title;

    /**
     * @var string $hash
     *
     * @ORM\Column(name="hash", type="string")
     */
    private $hash;

    /**
     * @var string $link
     *
     * @ORM\Column(name="link", type="string")
     */
    private $link;

    /**
     * @var string $unit
     *
     * @ORM\Column(name="unit", type="string")
     */
    private $unit;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param  string $title
     * @return Area
     */
    public function setTitle($title)
    {
        $this->title = $title;
        $this->hash = md5($title);
        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set link
     *
     * @param  string $link
     * @return Area
     */
    public function setLink($link)
    {
        $this->link = $link;
        return $this;
    }

    /**
     * Get link
     *
     * @return string
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * Set unit
     *
     * @param  string $unit
     * @return Area
     */
    public function setUnit($unit)
    {
        $this->unit = $unit;
        return $this;
    }

    /**
     * Get unit
     *
     * @return string
     */
    public function getUnit()
    {
        return $this->unit;
    }

    /**
     * Return array for API
     *
     * @param array $extraData
     * @return array
     */
    public function asApiArray($extraData=array()) {

        // Basic fields
        $array = array(
            'id'      => (int) $this->id,
            'title'   => $this->title,
            'link'    => $this->link,
            'unit'    => $this->unit,
            'created' => $this->getCreatedAt() ? $this->getCreatedAt()->format('Y-m-d H:i:s') : 0,
            'updated' => $this->getUpdatedAt() ? $this->getUpdatedAt()->format('Y-m-d H:i:s') : 0
        );

        if ( isset($extraData['data']) ) {

            $array['data'] = array();

            foreach ($extraData['data'] as $data) {
                $array['data'][] = $data->asApiArray();
            }
        }

        return $array;
    }

    /**
     * {@inheritDoc}
     */
    public function getArrayToIndex() {

        $document = array(
            "docid"  => 's'.$this->id,
            "fields" => array(
                "timestamp" => $this->getUpdatedAt() ? $this->getUpdatedAt()->getTimestamp() : 0,
                'text'      => $this->title
            ),
            "variables" => array(),
            "categories" => array(
                'model'       => 'Source'
            )
        );

        return $document;
    }

    /**
     * {@inheritDoc}
     */
    public static function getArrayToIndexFromArray($array) {

        $document = array(
            "docid"  => 's'.$array['id'],
            "fields" => array(
                "timestamp" => (int) strtotime($array['updated_at']),
                'text'      => $array['title']
            ),
            "variables" => array(),
            "categories" => array(
                'model'       => 'Source'
            )
        );

        return $document;
    }

}