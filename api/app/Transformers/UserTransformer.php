<?php
/**
 * Created by PhpStorm.
 * User: Chantouch Sek
 * Date: 2/23/2018
 * Time: 5:08 PM
 */

namespace App\Transformers;


class UserTransformer extends BaseTransformer
{

    /**
     * Method used to transform an item.
     *
     * @param $item mixed The item to be transformed.
     *
     * @return array The transformed item.
     */
    public function transform($item): array
    {
        return [
            'id' => (int)$item->id,
            'name' => (string)$item->name,
            'email' => (string)$item->email,
            'registered_date' => $item->created_at->toDateString(),
        ];
    }
}