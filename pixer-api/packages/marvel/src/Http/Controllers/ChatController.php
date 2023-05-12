<?php

namespace Marvel\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use GetStream\StreamChat\Client as StreamClient;

class ChatController extends CoreController
{
    /**
     * Generate token for clientside use
     */

    public function generateToken(Request $request)
    {
        $client = new StreamClient(env(MIX_STREAM_API_KEY), env(MIX_STREAM_API_SECRET));
        $user_id = explode('@', $request->email)[0];

        return response()->json([
            'token' => $client->createToken($user_id)
        ]);
    }
}
