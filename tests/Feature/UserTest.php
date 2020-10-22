<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    use RefreshDatabase;
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function testUserCreate(){
        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->json('POST', '/api/user', [
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'username' =>'john',
            'passowrd' =>'johndoe'
        ]);
        dump($response);
    }
}
