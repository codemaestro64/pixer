<?php

namespace Marvel\Facades;

use Illuminate\Support\Facades\Facade;

class Community extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'community';
    }
}
